Feature: Gestión tags

  @user2 @web
  Scenario: 'CE001 - El usuario debería poder crear una nueva etiqueta'
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When El usuario ingresa credenciales válidas
    And hace clic en el boton de ingreso
    And esta en la sección de creación de tags
    When El usuario crea un tag y la publica.
    Then El sistema debe mostrar un mensaje de éxito al crear la tag.

    #Scenario: CE002 - El usuario debería poder modificar una etiqueta
    When El usuario modifica el nombre del tag.
    Then El sistema debe mostrar un mensaje de éxito después de la modificación del tag.

    #Scenario: CE003 - El usuario debería poder eliminar una etiqueta
    When el usuario selecciona una etiqueta
    And elimina la etiqueta
    Then el sistema debe confirmar su eliminación.

    #Scenario: CE004 - El usuario No debería poder modificar una etiqueta con datos invalidos'
    When el usuario selecciona una etiqueta
    And El usuario modifica el tag con datos invalidos.
    Then El sistema debe mostrar un mensaje de error.

