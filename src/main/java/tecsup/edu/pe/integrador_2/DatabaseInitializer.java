package tecsup.edu.pe.integrador_2; // Asegúrate de que este sea tu paquete principal

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tecsup.edu.pe.integrador_2.model.TipoTerreno;
import tecsup.edu.pe.integrador_2.repository.TipoTerrenoRepository;

import java.util.List;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final TipoTerrenoRepository tipoTerrenoRepository;

    public DatabaseInitializer(TipoTerrenoRepository tipoTerrenoRepository) {
        this.tipoTerrenoRepository = tipoTerrenoRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (tipoTerrenoRepository.count() == 0) {
            List<TipoTerreno> tiposTerreno = List.of(
                    new TipoTerreno("Arcilloso"),
                    new TipoTerreno("Arenoso"),
                    new TipoTerreno("Limoso"),
                    new TipoTerreno("Rocoso"),
                    new TipoTerreno("Árido"),
                    new TipoTerreno("Ácido")
            );
            tipoTerrenoRepository.saveAll(tiposTerreno);
            System.out.println("Tipos de terreno inicializados en la base de datos.");
        } else {
            System.out.println("La tabla de tipos de terreno ya contiene datos.");
        }
    }
}