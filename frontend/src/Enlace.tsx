import styles from "./components/layout/header/Header.module.scss";

function Enlace({ title }: any) {
	return (
		<div className={styles.link_style}>
			{/* Register your data water */}
			{title}
		</div>
	);
}
export { Enlace };
