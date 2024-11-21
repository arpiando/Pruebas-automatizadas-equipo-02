Feature: Creacion miembros

  @user2 @web
  Scenario: 'CM001 - El usuario debería poder crear un nuevo miembro exitosamente'
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When El usuario ingresa credenciales válidas
    And hace clic en el boton de ingreso
    And esta en la sección de miembros
    When El usuario crea un nuevo miembro.
    Then El sistema verifica si el miembro se ha creado exitosamente.

    Given El usuario ha navegado al sitio, ha iniciado sesión y ha crea un miembro exitosamente.
    When El usuario edita un miembro.
    Then El sistema verifica si el nombre del miembro se ha actualizado.

    Given El usuario ha navegado al sitio, ha iniciado sesión, ha crea un miembro exitosamente y lo editó.
    And seleciona el primer miembro
    When El usuario elimina el miembro
    Then El sistema verifica si se ha eliminado.

