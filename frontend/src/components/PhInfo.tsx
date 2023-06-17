import styles from "./PhInfo.module.scss";
function PhInfo() {
	return (
		<div className={styles.ph_info_container}>
			<h2>Measurement units and ideal parameters</h2>

			<h3>Microorganisms</h3>
			<p>
				The presence of fecal coliform bacteria or E. coli is measured in colony
				forming units per 100 milliliters (CFU/100 ml).
			</p>

			<h3>Chemical substances</h3>
			<p>
				Concentrations of heavy metals and organic chemicals are measured in
				different units depending on the specific parameter, such as micrograms
				per liter (μg/L) or parts per million (ppm).
			</p>

			<h3>Physical parameters</h3>
			<p>
				Turbidity is measured in nephelometric turbidity units (NTU) or
				turbidity nephelometers (NTU). pH is measured on a scale of 0 to 14 and
				residual chlorine levels are measured in milligrams per liter (mg/L) or
				parts per million (ppm).
			</p>

			<h2 className={styles.second_h2}>Ideal parameter</h2>
			<p>
				There is no single parameter that defines the ideal for all water
				quality factors. Ideal values ​​imply the absence of pathogenic
				microorganisms, a minimal concentration of harmful chemicals, low
				turbidity, a neutral or near neutral pH, and adequate residual chlorine
				levels for disinfection.
			</p>
			<br />
			<p>
				It is important to note that ideal standards and values ​​may vary
				depending on the regulations and guidelines of each specific country or
				region.
			</p>
		</div>
	);
}

export { PhInfo };
