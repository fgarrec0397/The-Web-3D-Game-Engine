import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { FieldType } from "@granity-engine/App/Widgets/_actions/widgetsConstants";
import { useAccordionDefaultOpened } from "@granity-engine/Theme/hooks/accordion";
import { FC } from "react";

import EditorOptionsCheckboxField from "./EditorOptionsCheckboxField";
import EditorOptionsNumberField from "./EditorOptionsNumberField";
import EditorOptionsSelectField from "./EditorOptionsSelectField";
import EditorOptionsTextField from "./EditorOptionsTextField";
import EditorOptionsVector3Field from "./EditorOptionsVector3Field";

const EditorWidgetOptions: FC = () => {
    const openedAccordion = useAccordionDefaultOpened();
    const { selectedWidgets } = useWidgets();

    return (
        <Accordion {...openedAccordion}>
            <AccordionSummary>Options</AccordionSummary>
            <AccordionDetails>
                <>
                    {selectedWidgets.length > 1 ? (
                        <Typography>
                            {"Impossible to edit widget while more than one is selected"}
                        </Typography>
                    ) : (
                        selectedWidgets.length > 0 &&
                        selectedWidgets[0].options?.map((option, index) => {
                            const key = `${option.displayName}-${index}`;

                            if (option.fieldType === FieldType.Text) {
                                return <EditorOptionsTextField key={key} option={option} />;
                            }

                            if (option.fieldType === FieldType.Number) {
                                return <EditorOptionsNumberField key={key} option={option} />;
                            }

                            if (option.fieldType === FieldType.Checkbox) {
                                return <EditorOptionsCheckboxField key={key} option={option} />;
                            }

                            if (option.fieldType === FieldType.Vector3) {
                                return <EditorOptionsVector3Field key={key} option={option} />;
                            }

                            if (option.fieldType === FieldType.Select) {
                                return <EditorOptionsSelectField key={key} option={option} />;
                            }

                            return null;
                        })
                    )}
                </>
            </AccordionDetails>
        </Accordion>
    );
};

export default EditorWidgetOptions;
