package com.example.demo.Servicio;
import com.example.demo.Modelo.Persona;
import com.example.demo.Repositorio.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.concurrent.CompletableFuture;
import java.util.List;


@Service
public class PersonaService {
@Autowired
private PersonaRepository personaRepository;
@Async
public CompletableFuture<List<Persona>> getAllPersonas() {
return CompletableFuture.completedFuture(personaRepository.findAll());
}
@Async
public CompletableFuture<Persona> savePersona(Persona persona) {
return CompletableFuture.completedFuture(personaRepository.save(persona));
}
@Async
public CompletableFuture<Persona> updatePersona(Long id, Persona personaDetails) {
return personaRepository.findById(id)
.map(persona -> {
persona.setNombre(personaDetails.getNombre());
persona.setApellido(personaDetails.getApellido());
persona.setEmail(personaDetails.getEmail());
return CompletableFuture.completedFuture(personaRepository.save(persona));
}).orElseGet(() -> CompletableFuture.completedFuture(null));
}
@Async
public CompletableFuture<Persona> getPersonaById(Long id) {
return CompletableFuture.completedFuture(personaRepository.findById(id).orElse(null));
}
@Async
public CompletableFuture<Void> deletePersona(Long id) {
personaRepository.deleteById(id);
return CompletableFuture.completedFuture(null);
}
}

