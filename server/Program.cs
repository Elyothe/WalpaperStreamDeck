using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Configuration des services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});
builder.Services.AddControllers();

var app = builder.Build();

// Configuration du pipeline HTTP
app.UseRouting();

app.UseStaticFiles(); 

app.UseCors("AllowAll"); // Applique la politique CORS

app.UseAuthorization();

app.MapControllers();

app.Run();