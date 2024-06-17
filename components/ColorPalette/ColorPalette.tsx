import { Pressable, View } from "react-native";
import tw from "twrnc";
import { COLORS } from "@/constants";
import { useColoringContext } from "@/contexts/coloring";

type ColorPaletteProps = {
  style?: Record<string, unknown>;
};

const ColorPalette = ({ style }: ColorPaletteProps) => {
  const { selectedColor, setSelectedColor } = useColoringContext();

  return (
    <View
      style={tw.style(
        "flex-row flex-wrap gap-2 p-4 rounded-lg shadow-lg bg-white justify-center items-center",
        {
          ...style,
        },
      )}
    >
      {COLORS.map((color) => (
        <Pressable onPress={() => setSelectedColor(color)} key={color}>
          <View
            style={tw.style("h-8 w-8 rounded-full shadow-lg", {
              "border-2 border-black": selectedColor === color,
              backgroundColor: color,
            })}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default ColorPalette;
