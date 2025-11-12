using Microsoft.EntityFrameworkCore;
using SistemaABM_Eventos_Data;                    // BDSistemaEventosContext
using SistemaABM_Eventos_Repository.Interface;   // IServiceEvento
using SistemaABM_Eventos_Repository.Service;     // ServiceEvento  <-- OJO: namespace "Service", no "Sevice"

var builder = WebApplication.CreateBuilder(args);

// servicios base
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

// EF Core (ajustá el provider/conn string)
builder.Services.AddDbContext<BDSistemaEventosContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ⬇️ REGISTRO CLAVE
builder.Services.AddScoped<IServiceEvento, ServiceEvento>();
// Si también tenés venues:
// builder.Services.AddScoped<IServiceVenue, ServiceVenue>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();      // si te molesta el warning de https, podés comentarlo en dev
app.UseCors("AllowAll");
app.UseAuthorization();

app.MapControllers();

app.Run();
