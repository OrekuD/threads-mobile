import React from "react";
import GBottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Portal } from "@gorhom/portal";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import useColors from "@/hooks/useColors";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  height?: number;
  snapPoints?: Array<string | number>;
  initialSnapIndex?: number;
}

export default function BottomSheet(props: React.PropsWithChildren<Props>) {
  const bottomSheetRef = React.useRef<GBottomSheet>(null);
  const [sheetIndex, setSheetIndex] = React.useState(-1);
  const isDarkMode = useIsDarkMode();
  const colors = useColors();

  const snapPoints = React.useMemo(
    () => props.snapPoints || [props.height || 200, props.height || 200],
    [props.height, props.snapPoints]
  );

  React.useEffect(() => {
    if (props.isOpen) {
      setSheetIndex(props.initialSnapIndex || 1);
      bottomSheetRef.current?.expand();
    } else {
      setSheetIndex(-1);
      bottomSheetRef.current?.close();
    }
  }, [props.isOpen, props.initialSnapIndex]);

  return (
    <Portal>
      <GBottomSheet
        ref={bottomSheetRef}
        index={sheetIndex}
        snapPoints={snapPoints}
        onClose={props.onClose}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: colors.modalBackground,
        }}
        handleIndicatorStyle={{
          backgroundColor: isDarkMode ? "#555555" : "#DBDBDB",
        }}
        backdropComponent={() => {
          return <Backdrop sheetIndex={sheetIndex} onClose={props.onClose} />;
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {props.children}
        </View>
      </GBottomSheet>
    </Portal>
  );
}

interface BackdropProps {
  sheetIndex: number;
  onClose: () => void;
}

function Backdrop(props: BackdropProps) {
  if (props.sheetIndex < 0) return null;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onClose}
      style={styles.backdrop}
    />
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
