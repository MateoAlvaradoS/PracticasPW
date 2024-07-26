package com.example.demo.Controlador;
import com.example.demo.Modelo.Persona;
import com.example.demo.Servicio.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.concurrent.CompletableFuture;
@RestController
@RequestMapping("/api/personas")
public class PersonaController {
@Autowired
private PersonaService personaService;
@GetMapping
public CompletableFuture<ResponseEntity<List<Persona>>> getAllPersonas() {
return personaService.getAllPersonas().thenApply(ResponseEntity::ok);
}
@PostMapping
public CompletableFuture<ResponseEntity<Persona>> createPersona(@RequestBody Persona persona) {
return personaService.savePersona(persona).thenApply(ResponseEntity::ok);
}
@GetMapping("/{id}")
public CompletableFuture<ResponseEntity<Persona>> getPersonaById(@PathVariable Long id) {
return personaService.getPersonaById(id).thenApply(ResponseEntity::ok);
}
@PutMapping("/{id}")
public CompletableFuture<ResponseEntity<Persona>> updatePersona(@PathVariable Long id,
@RequestBody Persona personaDetails) {
    return personaService.updatePersona(id, personaDetails).thenApply(updatedPersona -> {
        if (updatedPersona != null) {
        return ResponseEntity.ok(updatedPersona);
        } else {
        return ResponseEntity.notFound().build();
        }
        });
        }
        @DeleteMapping("/{id}")
        public CompletableFuture<ResponseEntity<Void>> deletePersona(@PathVariable Long id) {
        return personaService.deletePersona(id).thenApply(ResponseEntity::ok);
        }
        }
        