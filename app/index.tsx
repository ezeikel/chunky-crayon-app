import { Text, View } from "react-native";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native";

const Index = () => {
  return (
    <View style={tw`flex-1`}>
      <LinearGradient colors={["#FFF2E6", "#FFE6CC"]} style={tw`flex-1`}>
        <Text>Edit app/index.tsx to edit this screen.</Text>
        <Button
          title="Press me"
          onPress={() => {
            throw new Error("Hello, again, Sentry!");
          }}
        />
      </LinearGradient>
    </View>
  );
};

export default Index;
