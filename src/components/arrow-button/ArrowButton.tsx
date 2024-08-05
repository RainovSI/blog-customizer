import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

type ArrowButtonProps = {
	isOpen: boolean;
	onClick: () => void;
};

export const ArrowButton: React.FC<ArrowButtonProps> = ({
	isOpen,
	onClick,
}) => (
	<div
		role='button'
		aria-label='Открыть/Закрыть форму параметров статьи'
		tabIndex={0}
		className={clsx(styles.container, { [styles.container_open]: isOpen })}
		onClick={onClick}>
		<img
			src={arrow}
			alt='иконка стрелочки'
			className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
		/>
	</div>
);
