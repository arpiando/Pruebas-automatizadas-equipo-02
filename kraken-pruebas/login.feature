Feature: Inicio de sesión

  @user2 @web
  Scenario: LP001 - El usuario debería recibir un mensaje de error con correo inválido o poder iniciar sesión con credenciales válidas
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When El usuario ingresa credenciales válidas
    And hace clic en el boton de ingreso
    Then el sistema debe mostrar el menú del panel de administración.
