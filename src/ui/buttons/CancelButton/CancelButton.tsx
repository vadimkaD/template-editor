import React, {FunctionComponent} from 'react';
import {Button, ButtonProps, CANCEL} from "../Button/Button";

export const CancelButton: FunctionComponent<ButtonProps> = props => <Button intent={CANCEL} {...props} />