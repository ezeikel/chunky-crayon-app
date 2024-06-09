import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import ColoringImages from "@/components/ColoringImages/ColoringImages";

const Index = () => {
  return (
    <View style={tw`flex-1`}>
      <LinearGradient colors={["#FFF2E6", "#FFE6CC"]} style={tw`flex-1`}>
        <ColoringImages />
      </LinearGradient>
    </View>
  );
};

export default Index;
