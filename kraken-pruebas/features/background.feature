Feature: Cambio de background

  @user2 @web
  Scenario: BC001 - El usuario debería poder activar el modo oscuro y luego volver al modo claro
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When El usuario ingresa credenciales válidas
    And hace clic en el boton de ingreso
    And obtenemos el estado actual del fondo
    And El usuario hace clic en el botón para cambiar el fondo
    Then Verificar que el nuevo modo es el opuesto del actual