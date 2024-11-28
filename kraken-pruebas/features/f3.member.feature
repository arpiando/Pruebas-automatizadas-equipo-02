Feature: Gestión de miembros

  @user2 @web
  Scenario: 'CM001 - El usuario debería poder crear un nuevo miembro exitosamente'
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When El usuario ingresa credenciales válidas
    And hace clic en el boton de ingreso
    And esta en la sección de miembros
    When El usuario crea un nuevo miembro.
    Then El sistema verifica si el miembro se ha creado exitosamente.

    #Scenario: CM002 - El usuario debería poder actualizar el nombre del miembro
    Given El usuario ha navegado al sitio, ha iniciado sesión y ha crea un miembro exitosamente.
    When El usuario edita un miembro.
    Then El sistema verifica si el nombre del miembro se ha actualizado.

    #Scenario: CM003 - El usuario debería poder eliminar un miembro
    Given El usuario ha navegado al sitio, ha iniciado sesión, ha crea un miembro exitosamente y lo editó.
    And seleciona el primer miembro
    When El usuario elimina el miembro
    Then El sistema verifica si se ha eliminado.

    #Scenario: CM004 - El usuario debería recibir un mensaje error al crear un miembro con nombre maximo de caracteres
    Given El usuario ha navegado al sitio, ha iniciado sesión y ha crea un miembro exitosamente.
    When El usuario crea un nuevo miembro con datos invalidos.
    Then El sistema informa del error.

    #Scenario: CM005 - El usuario debería recibir un mensaje error al crear un miembro con email invalido
    Given El usuario ha navegado al sitio, ha iniciado sesión y ha crea un miembro exitosamente.
    When El usuario crea un nuevo miembro con datos invalidos en el email.
    Then El sistema informa del error.

    #Scenario: CM006 - El usuario debería poder crear un nuevo miembro con nombre vacio exitosamente
    Given El usuario ha navegado al sitio, ha iniciado sesión y ha crea un miembro exitosamente.
    When El usuario crea un nuevo miembro con datos validos en el email pero sin nombre.
    Then El sistema verifica si el miembro se ha creado exitosamente.

