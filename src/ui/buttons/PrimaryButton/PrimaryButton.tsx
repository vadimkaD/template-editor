import React, {FunctionComponent} from 'react';
import {Button, ButtonProps, PRIMARY} from "../Button/Button";

export const PrimaryButton: FunctionComponent<ButtonProps> = props => <Button intent={PRIMARY} {...props} />