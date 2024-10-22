import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { CardContents } from "./CardContents";
import { FooterContents } from "./FooterContents";

interface PokemonCardProps {
  description: string;
  headingText: string;
  isLoading: boolean;
  isShiny: boolean;
  selection: any;
  setIsLoading: any;
  setIsShiny: any;
  updateSelection: any;
}

export const PokemonCard = ({
  description,
  headingText,
  isLoading,
  isShiny,
  selection,
  setIsLoading,
  setIsShiny,
  updateSelection,
}: PokemonCardProps) => {
  return (
    <Card w={{ base: "auto", lg: "md" }} minHeight="xl">
      <CardHeader>
        <Heading size="md">{headingText}</Heading>
      </CardHeader>
      {isLoading && (
        <CardBody>
          <Center>
            <Spinner size="xl" />
          </Center>
        </CardBody>
      )}
      {!isLoading && (
        <CardContents
          description={description}
          isShiny={isShiny}
          selection={selection}
        />
      )}
      <Divider />
      <FooterContents
        isLoading={isLoading}
        isShiny={isShiny}
        selection={selection}
        setIsLoading={setIsLoading}
        setIsShiny={setIsShiny}
        updateSelection={updateSelection}
      />
    </Card>
  );
};
