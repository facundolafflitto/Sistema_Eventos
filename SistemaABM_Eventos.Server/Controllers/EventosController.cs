using Microsoft.AspNetCore.Mvc;
using SistemaABM_Eventos_Repository.Interface;
using SistemaABM_Eventos_TransferObject.ModelsDTO;

namespace SistemaABM_Eventos.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventosController : ControllerBase
{
    private readonly IServiceEvento _svc;
    public EventosController(IServiceEvento svc) => _svc = svc;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EventoDTO>>> Get(
        [FromQuery] string? query,
        [FromQuery] DateTime? desde,
        [FromQuery] DateTime? hasta)
    {
        return await _svc.Listar(query, desde, hasta, 1, 10000);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EventoDTO?>> GetById(int id) 
        => await _svc.Obtener(id);

    [HttpPost]
    public async Task<ActionResult<int>> Post([FromBody] EventoCreateDTO dto) 
        => await _svc.Crear(dto);

    [HttpPut("{id}")]
    public async Task<ActionResult<bool>> Put(int id, [FromBody] EventoCreateDTO dto) 
        => await _svc.Editar(id, dto);

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> Delete(int id) 
        => await _svc.Eliminar(id);
}
