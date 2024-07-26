
/**
 * El paquete 'services' contiene los servicios que serán llamados por lo controladores para hacer distintas operaciones.
 * Estos servicios se comunicarán con los repositorios, que son los que operarán directamente con la base de datos.
 * Los servicios solo se encargarán de llamar a métodos de los repositorios y también definirán cierta lógica extra (validar emails, encriptar contraseñas, iniciar sesión...)
 */
package com.hostheaven.backend.services;