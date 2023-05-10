import React, { useState } from "react";
import { labelColors } from "~/routes/tfm_ner";
import { Badge } from "./badge";
import { TfmNerFormValues } from "~/routes/tfm_ner_.$id";
import { X } from "lucide-react";
import { Button } from "./button";
import { useSubmit } from "@remix-run/react";


export function getRandomColor(usedColors: { [key: string]: string }) {
  const letters = "0123456789ABCDEF";
  let color = "#";
  let isUnique = false;

  while (!isUnique) {
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    if (!usedColors[color]) {
      isUnique = true;
    } else {
      color = "#";
    }
  }

  return color;
}



export function lightenColor(color: string, amount: number) {
  const hex = color.slice(1);
  const rgb = parseInt(hex, 16);
  const r = (rgb >> 16) + amount * 255;
  const g = ((rgb >> 8) & 0x00ff) + amount * 255;
  const b = (rgb & 0x0000ff) + amount * 255;
  const newColor = (r << 16) | (g << 8) | b;
  return "#" + newColor.toString(16).padStart(6, "0");
}


interface LabelBadgeRemoveProps {
  text: string;
  onRemove: () => void;
}

export const LabelBadgeRemove: React.FC<LabelBadgeRemoveProps> = ({ text, onRemove }) => {
  // const color = getLabelColor(text);
  const color = labelColors[text] || "gray";

  return <Badge variant="secondary" style={{ backgroundColor: color }}>
    {text}
    <Button variant={"ghost"} size={'bg'} className="ml-2" onClick={onRemove} ><X className="" /></Button>
  </Badge>;
};


const LabelBadge = ({ text }: { text: string }) => {
  // const color = getLabelColor(text);
  const color = labelColors[text] || "gray";

  return <Badge variant="secondary" style={{ backgroundColor: color }}>{text}</Badge>;

  // return <Badge variant="secondary" >{text}</Badge>;
};

const ValueBadge = ({ text }: { text: string }) => {
  return <Badge variant="outline">{text}</Badge>;
};



interface ConvertComponentProps {
  res: TfmNerFormValues;
  // onRemove: () => void;
}



export const ConvertComponentWithRemove: React.FC<ConvertComponentProps> = ({ res }) => {
  const utterance = res.utterance;
  const contexts = res.contexts;
  const submit = useSubmit();


  const entityValues = contexts.map(context => context.entity_value);

  // Split the utterance by entity values
  const utteranceSplit = utterance.split(new RegExp(`(${entityValues.join('|')})`, 'g'));

  // Combine the split parts
  // const combinedList = [];
  const combinedList: string[] = [];

  for (let i = 0; i < utteranceSplit.length; i += 2) {
    if (utteranceSplit[i + 1]) {
      combinedList.push(utteranceSplit[i] + utteranceSplit[i + 1]);
    } else {
      combinedList.push(utteranceSplit[i]);
    }
  }

  const replacedElements: React.ReactNode[] = [];


  function onRemove(id: string) {
    console.log('remove', id)
    // const updatedContexts = contexts.filter(context => context.id !== id);
    // console.log(updatedContexts)

    const formData = new FormData();
    formData.append("id", id);
    console.log(formData)
    submit(formData, { method: "post", action: `/tfm_ner/${res.id}` });

  }


  // Replace entity values with components in combinedList
  combinedList.map((item, idx) => {
    let replacedText = <React.Fragment>{item}</React.Fragment>;
    contexts.forEach((context) => {
      const regex = new RegExp(`\\b${context.entity_value}\\b`, 'g');
      replacedText = (
        <React.Fragment>
          {React.Children.toArray(replacedText.props.children).map((child) => {
            if (typeof child === 'string') {
              return child.split(regex).map((text, index) => {
                if (index > 0) {
                  return (
                    <React.Fragment key={index}>
                      <ValueBadge text={context.entity_value} />{' '}
                      <LabelBadgeRemove text={context.entity_type} onRemove={() => onRemove(context.id)} />{text}
                    </React.Fragment>
                  );
                }
                return text;
              });
            }
            return child;
          })}
        </React.Fragment>
      );


    });

    function handleClickHighlightedText(item: string, idx: number): void {
      const highlightedWord = combinedList[idx];
      console.log('Highlighted word:', highlightedWord), idx;
    }
    // replacedElements.push(<React.Fragment key={idx}>{replacedText}</React.Fragment>);
    replacedElements.push(
      <React.Fragment key={idx}>
        <span
          // onClick={() => console.log('Highlighted text:', item)}
          onClick={() => handleClickHighlightedText(item, idx)}

        >
          {replacedText}
        </span>
      </React.Fragment>
    );

  });

  return <div>{replacedElements}</div>;
};


export const ConvertComponent = ({ res }: { res: TfmNerFormValues }) => {
  const utterance = res.utterance;
  const contexts = res.contexts;


  const entityValues = contexts.map(context => context.entity_value);

  // Split the utterance by entity values
  const utteranceSplit = utterance.split(new RegExp(`(${entityValues.join('|')})`, 'g'));

  // Combine the split parts
  const combinedList = [];
  for (let i = 0; i < utteranceSplit.length; i += 2) {
    if (utteranceSplit[i + 1]) {
      combinedList.push(utteranceSplit[i] + utteranceSplit[i + 1]);
    } else {
      combinedList.push(utteranceSplit[i]);
    }
  }

  const replacedElements: React.ReactNode[] = [];


  // Replace entity values with components in combinedList
  combinedList.map((item, idx) => {
    let replacedText = <React.Fragment>{item}</React.Fragment>;
    contexts.forEach((context) => {
      const regex = new RegExp(`\\b${context.entity_value}\\b`, 'g');
      replacedText = (
        <React.Fragment>
          {React.Children.toArray(replacedText.props.children).map((child) => {
            if (typeof child === 'string') {
              return child.split(regex).map((text, index) => {
                if (index > 0) {
                  return (
                    <React.Fragment key={index}>
                      <ValueBadge text={context.entity_value} />{' '}
                      <LabelBadge text={context.entity_type} />{text}
                    </React.Fragment>
                  );
                }
                return text;
              });
            }
            return child;
          })}
        </React.Fragment>
      );


    });
    replacedElements.push(<React.Fragment key={idx}>{replacedText}</React.Fragment>);

  });

  return <div>{replacedElements}</div>;
};






