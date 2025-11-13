using Microsoft.AspNetCore.Mvc;
using SistemaABM_Eventos_Repository.Interface;      
using SistemaABM_Eventos_TransferObject.ModelsDTO;

namespace SistemaABM_Eventos.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LotesController : ControllerBase
{
    private readonly IServiceLote _svc;
    public LotesController(IServiceLote svc) => _svc = svc;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LoteEntradaDTO>>> Get([FromQuery] int eventoId)
        => await _svc.PorEvento(eventoId);

    [HttpPost]
    public async Task<ActionResult<int>> Post([FromBody] LoteEntradaDTO dto)
        => await _svc.Crear(dto);

    [HttpPut("{id}")]
    public async Task<ActionResult<bool>> Put(int id, [FromBody] LoteEntradaDTO dto)
        => await _svc.Editar(dto with { Id = id });

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> Delete(int id)
        => await _svc.Eliminar(id);
}
