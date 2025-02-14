import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ListstreamdeckComponent } from '../../components/liststreamdeck/liststreamdeck.component';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  imageUrl: string | ArrayBuffer | null = null;
  imageSegments: string[] = [];
  segmentWidth = 100; // Largeur de chaque segment en pixels
  segmentHeight = 100; // Hauteur de chaque segment en pixels
  printTitle: boolean = true;
  gap = 15; // Ecart entre les touches en pixels
  image: HTMLImageElement | null = null;
  totalWidth: number = 0;
  totalHeight: number = 0;
  newWidth: number = 0;
  newHeight: number = 0;

  constructor() {}

  openFileExplorer(fileInput: HTMLInputElement): void {
    fileInput.click();
  }
  streamDecks = ['15 Caps', '6 Caps', '32 Caps'];
  selectedStreamDeck: string = '';

  onStreamDeckChange(event: any) {
    this.selectedStreamDeck = event.target.value;
    if (this.selectedStreamDeck == this.streamDecks[0]) {
      this.sliceImage(5, 3);
      console.log(this.selectedStreamDeck);
    }
    if (this.selectedStreamDeck == this.streamDecks[1]) {
      this.sliceImage(3, 2);
      console.log(this.selectedStreamDeck);
    }
    if (this.selectedStreamDeck == this.streamDecks[2]) {
      this.sliceImage(8, 4);
      console.log(this.selectedStreamDeck);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.image = new Image();
        this.image.src = this.imageUrl as string;
        this.image.onload = () => {
          this.newWidth = this.image!.width;
          this.newHeight = this.image!.height;
        };
        this.sliceImage(5, 3);
        this.printTitle = false;
      };
      reader.readAsDataURL(file);
    }
  }

  saveImage(): void {
    if (this.image) {
      const link = document.createElement('a');
      link.href = this.image.src;
      link.download = 'image.png';
      link.click();
    }
  }

  resizeImage(): void {
    if (this.image) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = this.newWidth;
      canvas.height = this.newHeight;
      ctx?.drawImage(this.image, 0, 0, this.newWidth, this.newHeight);
      this.image.src = canvas.toDataURL();
    }
  }

  sliceImage(largeur: number, hauteur: number): void {
    if (this.imageUrl) {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        // Calculer les dimensions pour découper en 15 segments égaux (3x5) en tenant compte de l'écart
        this.totalWidth = largeur * this.segmentWidth + 4 * this.gap;
        this.totalHeight = hauteur * this.segmentHeight + 2 * this.gap;

        // Calculer le facteur de zoom pour remplir les segments sans déformer l'image
        const scale = Math.max(
          this.totalWidth / width,
          this.totalHeight / height
        );

        // Créer un canvas pour découper l'image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = this.totalWidth;
        canvas.height = this.totalHeight;
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Découper l'image en 15 segments (3x5)
        this.imageSegments = [];

        for (let row = 0; row < hauteur; row++) {
          for (let col = 0; col < largeur; col++) {
            const segmentCanvas = document.createElement('canvas');
            const segmentCtx = segmentCanvas.getContext('2d');
            segmentCanvas.width = this.segmentWidth;
            segmentCanvas.height = this.segmentHeight;

            // Découper chaque segment à partir du canvas en tenant compte de l'écart
            segmentCtx?.drawImage(
              canvas,
              col * (this.segmentWidth + this.gap),
              row * (this.segmentHeight + this.gap),
              this.segmentWidth,
              this.segmentHeight,
              0,
              0,
              this.segmentWidth,
              this.segmentHeight
            );

            // Ajouter chaque segment à la liste
            const segmentDataUrl = segmentCanvas.toDataURL();
            this.imageSegments.push(segmentDataUrl);
          }
        }
      };
      img.src = this.imageUrl as string;
    }
  }

  downloadAllSegments(): void {
    const zip = new JSZip();
    this.imageSegments.forEach((segment, index) => {
      const imgData = segment.split(',')[1];
      zip.file(`segment_${index + 1}.png`, imgData, { base64: true });
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'image_segments.zip');
    });
  }

  clearImage(): void {
    this.imageUrl = null;
    this.imageSegments = [];
  }
}
