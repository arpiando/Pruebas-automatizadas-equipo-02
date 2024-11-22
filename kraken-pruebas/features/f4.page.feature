Feature: Gestión de Pagina

  @user2 @web
  Scenario: MPA001 - El usuario debería poder crear y modificar una pagina
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When El usuario ingresa credenciales válidas
    And hace clic en el boton de ingreso
    When El usuario crea una pagina y la publica.
    Then El sistema debe mostrar un mensaje de éxito al crear la pagina.

    Given El usuario ha navegado al sitio, ha iniciado sesión y ha crea una pagina exitosamente.
    When El usuario modifica el título y el contenido de la pagina.
    Then El sistema debe mostrar un mensaje de éxito después de la modificación de la pagina.

    Given El usuario ha navegado al sitio, ha iniciado sesión y ha crea una pagina exitosamente.
    When El usuario selecciona una pagina
    And elimina la pagina
    Then El sistema debe mostrar un mensaje de éxito después de la elminación.


