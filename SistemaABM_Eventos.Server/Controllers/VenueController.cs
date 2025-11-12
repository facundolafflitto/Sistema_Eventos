using Microsoft.AspNetCore.Mvc;
using SistemaABM_Eventos_Repository.Interface;
using SistemaABM_Eventos_TransferObject.ModelsDTO;

namespace SistemaABM_Eventos.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VenuesController : ControllerBase
{
    private readonly IServiceVenue _svc;
    public VenuesController(IServiceVenue svc) => _svc = svc;

    [HttpGet] public async Task<ActionResult<IEnumerable<VenueDTO>>> Get() => await _svc.Listar();
    [HttpPost] public async Task<ActionResult<int>> Post([FromBody] VenueDTO dto) => await _svc.Crear(dto);
    [HttpPut("{id}")] public async Task<ActionResult<bool>> Put(int id, [FromBody] VenueDTO dto) { dto = dto with { Id = id }; return await _svc.Editar(dto); }
    [HttpDelete("{id}")] public async Task<ActionResult<bool>> Delete(int id) => await _svc.Eliminar(id);
}
