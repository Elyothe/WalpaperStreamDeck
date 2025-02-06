import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  imageUrl: string | ArrayBuffer | null = null;
  imageSegments: string[] = [];
  segmentWidth = 200; // Largeur de chaque segment en pixels
  segmentHeight = 200; // Hauteur de chaque segment en pixels

  constructor() {}

  openFileExplorer(fileInput: HTMLInputElement): void {
    fileInput.click(); // Ouvre l'explorateur de fichiers
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.sliceImage();
      };
      reader.readAsDataURL(file);
    }
  }

  sliceImage(): void {
    if (this.imageUrl) {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        // Calculer les nouvelles dimensions pour remplir 1000px x 600px tout en préservant le rapport d'aspect
        const aspectRatio = width / height;
        let newWidth = 1000;
        let newHeight = 600;

        if (aspectRatio > 1) {
          // L'image est plus large que haute, donc on ajuste la hauteur pour respecter l'aspect
          newHeight = Math.round(newWidth / aspectRatio);
        } else {
          // L'image est plus haute que large, donc on ajuste la largeur pour respecter l'aspect
          newWidth = Math.round(newHeight * aspectRatio);
        }

        // Créer un canvas pour redimensionner l'image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx?.drawImage(img, 0, 0, newWidth, newHeight); // Redimensionner sans déformer

        // Découper l'image en 15 segments (3x5)
        this.imageSegments = [];

        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 5; col++) {
            const segmentCanvas = document.createElement('canvas');
            const segmentCtx = segmentCanvas.getContext('2d');
            segmentCanvas.width = this.segmentWidth;
            segmentCanvas.height = this.segmentHeight;

            // Découper chaque segment à partir du canvas redimensionné
            // En utilisant un crop pour remplir chaque segment
            segmentCtx?.drawImage(
              canvas,
              col * this.segmentWidth - 0, // Ajuster pour zoomer correctement
              row * this.segmentHeight - 0, // Ajuster pour zoomer correctement
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

  clearImage(): void {
    this.imageUrl = null;
    this.imageSegments = [];
  }
}
