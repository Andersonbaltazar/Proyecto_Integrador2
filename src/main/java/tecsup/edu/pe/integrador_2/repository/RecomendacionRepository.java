package tecsup.edu.pe.integrador_2.repository;

import org.springframework.data.repository.CrudRepository;
import tecsup.edu.pe.integrador_2.model.Recomendacion;

import java.util.List;

public interface RecomendacionRepository extends CrudRepository<Recomendacion, Long> {
    List<Recomendacion> findByCultivoId(Long cultivoId);
}
