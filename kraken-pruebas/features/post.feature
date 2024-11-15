Feature: Crear post

  @user2 @web
  Scenario: 'MP001 - El usuario debería modificar un post exitosamente'
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When El usuario ingresa credenciales válidas
    And hace clic en el boton de ingreso
    And esta en la sección de creación de posts
    When El usuario crea un post y lo publica.
    Then El sistema debe mostrar un mensaje de éxito al crear el post.

    Given El usuario ha navegado al sitio, ha iniciado sesión y ha creado un post exitosamente.
    When El usuario modifica el título y el contenido del post.
    Then El sistema debe mostrar un mensaje de éxito después de la modificación.