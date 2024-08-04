import { useState, useRef, FormEvent } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import {
	ArticleStateType,
	defaultArticleState,
	fontColors,
	fontSizeOptions,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import { useToggleForm } from './hooks/useToggleForm';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	params: ArticleStateType;
	onChange: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	params,
	onChange,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	const toggleForm = useToggleForm({ isOpen, setIsOpen, wrapperRef });

	const [formState, setFormState] = useState({
		fontFamilyOption: params.fontFamilyOption,
		fontSizeOption: params.fontSizeOption,
		fontColor: params.fontColor,
		backgroundColor: params.backgroundColor,
		contentWidth: params.contentWidth,
	});

	const handleFormChange = (key: keyof ArticleStateType) => (value: any) => {
		setFormState((prevState) => ({ ...prevState, [key]: value }));
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onChange(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onChange(defaultArticleState);
	};

	return (
		<div ref={wrapperRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleFormChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={handleFormChange('fontSizeOption')}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleFormChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleFormChange('backgroundColor')}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleFormChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
