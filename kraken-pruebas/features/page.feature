Feature: Actualización pagina

  @user2 @web
  Scenario: MPA001 - El usuario debería poder modificar una pagina
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When El usuario ingresa credenciales válidas
    And hace clic en el boton de ingreso
    When El usuario crea una pagina y la publica.
    Then El sistema debe mostrar un mensaje de éxito al crear la pagina.

    Given El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de paginas.
    And crea una pagina exitosamente.
    When El usuario modifica el título y el contenido de la pagina.
    Then El sistema debe mostrar un mensaje de éxito después de la modificación de la pagina.
    When El usuario revierte el estatus de publicado de la pagina.
    Then El sistema debe mostrar un mensaje de confirmacion.


