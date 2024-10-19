import {
  CardBody,
  Center,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { padStart, startCase } from "lodash";
import { Pokemon } from "../../../types/Pokemon";

interface Props {
  flavorText: string;
  isShiny: boolean;
  selection?: Pokemon | null;
  setFlavorText: React.Dispatch<React.SetStateAction<string>>;
}

export const CardContents = ({
  flavorText,
  isShiny,
  selection,
  setFlavorText,
}: Props) => (
  <CardBody>
    <Center>
      <Image
        maxH="200px"
        maxW="200px"
        src={isShiny ? selection?.shinySprite : selection?.defaultSprite}
        alt={selection?.name}
        borderRadius="sm"
      />
    </Center>
    {selection && (
      <Stack mt="6">
        <Heading size="md">
          {startCase(selection.name)} #{" "}
          {padStart(selection.id.toString(), 4, "0")}
        </Heading>
        <Text fontSize="lg">{flavorText}</Text>
      </Stack>
    )}
  </CardBody>
);
