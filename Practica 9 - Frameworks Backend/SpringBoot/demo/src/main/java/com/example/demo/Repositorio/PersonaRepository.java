package com.example.demo.Repositorio;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Modelo.Persona;

public interface PersonaRepository extends JpaRepository<Persona, Long> {
}
