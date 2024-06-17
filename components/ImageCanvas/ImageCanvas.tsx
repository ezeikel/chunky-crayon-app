import { useState } from "react";
import {
  GestureResponderEvent,
  PanResponder,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Canvas,
  ImageSVG,
  useCanvasRef,
  useSVG,
  fitbox,
  rect,
  Group,
  SkPath,
  Skia,
  Path,
} from "@shopify/react-native-skia";
import tw from "twrnc";
import { ColoringImage } from "@/types";
import { useColoringContext } from "@/contexts/coloring";

type ImageCanvasProps = {
  coloringimage: ColoringImage;
};

type DrawingPath = {
  path: SkPath;
  color: string;
};

const ImageCanvas = ({ coloringimage }: ImageCanvasProps) => {
  const canvasRef = useCanvasRef();
  const { selectedColor } = useColoringContext();
  const [paths, setPaths] = useState<DrawingPath[]>([]);
  const [currentPath, setCurrentPath] = useState<SkPath | null>(null);
  const { width: screenWidth } = useWindowDimensions();
  const svg = useSVG(coloringimage.svgUrl);

  const canvasSize = screenWidth;

  const src = rect(0, 0, svg?.width() ?? 0, svg?.height() ?? 0);
  const dst = rect(0, 0, canvasSize, canvasSize);

  // taking into account the padding of the parent View (8px on each side)
  const canvasSizeWithPadding = canvasSize - 16;

  const handlePanResponderMove = (event: GestureResponderEvent) => {
    const touchX = event.nativeEvent.locationX;
    const touchY = event.nativeEvent.locationY;
    if (currentPath) {
      currentPath.lineTo(touchX, touchY);
      setCurrentPath(currentPath.copy());
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const touchX = event.nativeEvent.locationX;
      const touchY = event.nativeEvent.locationY;
      const newPath = Skia.Path.Make();
      newPath.moveTo(touchX, touchY);
      setCurrentPath(newPath);
    },
    onPanResponderMove: (event) => handlePanResponderMove(event),
    onPanResponderRelease: () => {
      if (currentPath) {
        setPaths([...paths, { path: currentPath, color: selectedColor }]);
        setCurrentPath(null);
      }
    },
  });

  return (
    <View
      style={tw.style(`bg-white rounded-lg shadow-lg`, {
        height: canvasSizeWithPadding,
        width: canvasSizeWithPadding,
      })}
      {...panResponder.panHandlers}
    >
      {svg && (
        <Canvas
          ref={canvasRef}
          style={tw.style({
            height: canvasSizeWithPadding,
            width: canvasSizeWithPadding,
          })}
        >
          {/* render SVG once to be below the colored paths */}
          <Group transform={fitbox("contain", src, dst)}>
            <ImageSVG
              x={0}
              y={0}
              width={canvasSize}
              height={canvasSize}
              svg={svg}
            />
            {paths.map((drawingPath, index) => (
              <Path
                key={index}
                path={drawingPath.path}
                color={drawingPath.color}
                style="stroke"
                strokeWidth={5}
                strokeCap="round"
                strokeJoin="round"
              />
            ))}
            {currentPath && (
              <Path
                path={currentPath}
                color={selectedColor}
                style="stroke"
                strokeWidth={5}
                strokeCap="round"
                strokeJoin="round"
              />
            )}
          </Group>
          {/* render SVG again to be on top of the colored paths */}
          <Group transform={fitbox("contain", src, dst)}>
            <ImageSVG
              x={0}
              y={0}
              width={canvasSize}
              height={canvasSize}
              svg={svg}
            />
          </Group>
        </Canvas>
      )}
    </View>
  );
};

export default ImageCanvas;
