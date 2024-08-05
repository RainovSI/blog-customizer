import { useEffect } from 'react';

type UseToggleFormProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	wrapperRef: React.RefObject<HTMLDivElement>;
};

export const useToggleForm = ({
	isOpen,
	setIsOpen,
	wrapperRef,
}: UseToggleFormProps) => {
	const toggleForm = () => setIsOpen(!isOpen);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, wrapperRef, setIsOpen]);

	return toggleForm;
};
