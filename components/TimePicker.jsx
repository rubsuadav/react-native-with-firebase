import React from "react";
import { View, Text } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import tw from "twrnc";

export default function TimePicker({ time, setTime }) {
  const [visible, setVisible] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      switch (true) {
        case isNaN(hours) || isNaN(minutes):
          setSnackbarMessage("Por favor, seleccione una hora válida");
          setSnackbarVisible(true);
          setVisible(false);
          break;
        default:
          break;
      }
      setTime(`${hours}:${minutes}`);
      setVisible(false);
    },
    [setVisible, setTime]
  );

  const onSnackbarDismiss = React.useCallback(() => {
    setSnackbarVisible(false);
  }, []);

  return (
    <SafeAreaProvider>
      <View style={tw`pt-5 text-black`}>
        <Button
          onPress={() => setVisible(true)}
          uppercase={false}
          mode="outlined"
        >
          {isNaN(time.split(":")[0]) || isNaN(time.split(":")[1]) ? (
            <Text style={tw`text-black`}>Selecciona una hora</Text>
          ) : (
            time
          )}
        </Button>
        <TimePickerModal
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          animationType="slide"
          hours={12}
          minutes={14}
          label="Hora de la reserva"
          cancelLabel="Cancelar"
          confirmLabel="Confirmar"
          keyboardIcon="clock-time-three-outline"
          clockIcon="clock-time-three-outline"
          locale="es"
          inputFontSize={16}
          use24HourClock={true}
        />
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onSnackbarDismiss}
          duration={2000}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </SafeAreaProvider>
  );
}
