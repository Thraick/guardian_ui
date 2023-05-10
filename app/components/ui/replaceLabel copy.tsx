import React from 'react';
// import { Badge } from 'react-bootstrap';
// import { VscTag } from 'react-icons/vsc';

import { Badge } from './badge';

import { z } from 'zod';
import { TfmNerFormValues } from '~/routes/tfm_ner';

// const contextSchema = z.object({
//   id: z.string(),
//   entity_type: z.string(),
//   entity_value: z.string(),
// });

// const dataSchema = z.object({
//   id: z.string(),
//   utterance: z.string(),
//   tfm_utterance: z.string(),
//   contexts: z.array(contextSchema),
// });

// export type TfmNerFormValues = z.infer<typeof dataSchema>;

interface ReplaceStringWithBadgeProps {
  res: TfmNerFormValues;
}



export function MyComponent() {
  const data = [
    {
      "id": "urn:uuid:7e0533ce-fc85-43dd-8c83-619d6e3ec455",
      "utterance": "RweDDwd i think is the taxi number",
      "tfm_utterance": "[RweDDwd](taxi_number) i think is the taxi number",
      "contexts": [
        {
          "id": "urn:uuid:fce40137-5879-47a5-8a89-2293796a1ebf",
          "entity_type": "taxi_number",
          "entity_value": "RweDDwd"
        }
      ]
    }
  ];

   const renderUtterances = () => {
    return data.map((item) => {
      const replacedUtterance = item.utterance.split(item.contexts[0].entity_value).flatMap((part, index, array) => {
        if (index === array.length - 1) {
          return part;
        }

        return [
          part,
          <span className="badge" key={index}>{item.contexts[0].entity_value}</span>
        ];
      });

      return (
        <div key={item.id}>
          <p>{replacedUtterance}</p>
          <p>{item.tfm_utterance}</p>
        </div>
      );
    });
  };


  return (
    <div>
      <h1>Utterances</h1>
      {renderUtterances()}
    </div>
  );
}

