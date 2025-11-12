using Microsoft.AspNetCore.Mvc;
using SistemaABM_Eventos_Repository.Interface;
using SistemaABM_Eventos_TransferObject.ModelsDTO;

namespace SistemaABM_Eventos.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ComprasController : ControllerBase
{
    private readonly IServiceCompra _svc;
    public ComprasController(IServiceCompra svc) => _svc = svc;

    [HttpPost] public async Task<ActionResult<CompraDTO>> Post([FromBody] ComprarRequestDTO dto) => await _svc.Comprar(dto);

    [HttpPut("validar/{codigo}")]
    public async Task<ActionResult<CheckInDTO>> Put(string codigo) => await _svc.Validar(codigo);
}
