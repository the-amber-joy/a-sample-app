import { Card, CardBody } from "@chakra-ui/react";

import { Pokemon } from "../types/Pokemon";
import { padStart } from "lodash";

export const FavoriteCard = ({ name, id }: Pokemon) => (
  <Card>
    <CardBody>
      {name} # {padStart(id.toString(), 4, "0")}
    </CardBody>
  </Card>
);
