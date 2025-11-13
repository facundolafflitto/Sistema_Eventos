using Microsoft.EntityFrameworkCore;
using SistemaABM_Eventos_Data;                    // BDSistemaEventosContext
using SistemaABM_Eventos_Repository.Interface;    // Interfaces: IServiceEvento, IServiceLote, etc.
using SistemaABM_Eventos_Repository.Service;      // Implementaciones: ServiceEvento, etc.
using SistemaABM_Eventos_Repository.Mapper;       // Perfil de AutoMapper

var builder = WebApplication.CreateBuilder(args);

// Servicios base
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

// EF Core
builder.Services.AddDbContext<BDSistemaEventosContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// AutoMapper
builder.Services.AddAutoMapper(typeof(MapperProfile).Assembly);

// Servicios de aplicación
builder.Services.AddScoped<IServiceEvento, ServiceEvento>();
builder.Services.AddScoped<IServiceLote, ServiceLote>();
builder.Services.AddScoped<IServiceCompra, ServiceCompra>();
builder.Services.AddScoped<IServiceVenue, ServiceVenue>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();

app.MapControllers();

app.Run();
