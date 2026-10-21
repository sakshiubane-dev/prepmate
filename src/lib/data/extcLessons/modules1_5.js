/**
 * PrepMate EXTC (Electronics & Telecommunication) Lesson Content
 * Modules 1 to 5: Semiconductor Physics, PN Junction, Diodes, Zener Diode, BJT
 * Each module contains all 15 comprehensive engineering sections.
 */

export const EXTC_MODULES_1_5 = {
  'semiconductor-physics': {
    id: 'semiconductor-physics',
    subjectId: 'electronic_devices',
    order: 1,
    title: 'Semiconductor Physics',
    estimatedTime: '40 mins',
    learningObjectives: [
      'Distinguish between conductors, semiconductors, and insulators using energy band theory.',
      'Analyze intrinsic carrier concentration and derive the mass-action law (n * p = n_i^2).',
      'Explain n-type and p-type doping mechanisms, donor/acceptor energy states, and charge neutrality.',
      'Formulate carrier drift, mobility, diffusion currents, and Einstein relationship (D/mu = V_T).',
      'Track Fermi level shifts as a function of doping concentration and ambient temperature.'
    ],
    prerequisites: [
      'Basic atomic structure (Bohr model, valence electrons, crystal lattice).',
      'Fundamentals of electric field, potential difference, and Coulomb\'s law.',
      'Familiarity with thermal energy (kT) and energy expressed in electron-volts (eV).'
    ],
    theoryAndConcepts: [
      {
        heading: '1. Energy Band Theory & Material Classification',
        content: `In isolated atoms, electrons occupy discrete quantum energy levels. When atoms pack into a periodic crystalline lattice (e.g., diamond cubic lattice of Silicon with 5.0 x 10^22 atoms/cm^3), discrete valence levels split into continuous energy bands due to Pauli exclusion:
- Valence Band (VB): The highest range of electron energies in which electrons are normally present at absolute zero (0 K). Completely filled in pure semiconductors at 0 K.
- Conduction Band (CB): The lowest range of vacant energy states where electrons can move freely under an applied electric field.
- Forbidden Energy Gap (E_g): The forbidden band gap separating VB and CB where no quantum electron states can exist:
  * Conductors (e.g., Copper, Aluminum): Overlapping VB and CB (E_g = 0 eV). Free electrons exist in abundance (~10^28/m^3) at all temperatures.
  * Semiconductors (e.g., Silicon: E_g = 1.12 eV, Germanium: E_g = 0.67 eV, Gallium Arsenide: E_g = 1.42 eV at 300 K): Moderate gap that thermal energy can bridge.
  * Insulators (e.g., Diamond: E_g ~ 5.5 eV, SiO_2: E_g ~ 9.0 eV): Very wide band gap; negligible thermal excitation across the gap at room temperature.`
      },
      {
        heading: '2. Intrinsic vs. Extrinsic Semiconductors & Doping',
        content: `Pure semiconductors (intrinsic, e.g., pure Si) have four valence electrons forming covalent bonds in a tetrahedral lattice. At 0 K, all bonds are intact, making intrinsic Si an insulator. At room temperature (300 K), thermal energy breaks some bonds, generating electron-hole pairs:
- Electron generation creates a free electron in CB leaving an unoccupied quantum state (hole) in VB.
- Holes act as fictitious positive charge carriers (+q = +1.6 x 10^-19 C) with effective mass m_p*.
- Intrinsic carrier concentration: n = p = n_i. For Silicon at 300 K, n_i ≈ 1.5 x 10^10 cm^-3.
Extrinsic Semiconductors are created by deliberately adding impurity atoms (doping, typically 1 impurity atom per 10^6 to 10^8 host atoms):
- N-Type: Doped with pentavalent donors (Group V: Phosphorus, Arsenic, Antimony). Donors contribute 5 valence electrons: 4 bond with Si, and the 5th electron easily ionizes into the CB with tiny ionization energy (E_d ≈ 0.045 eV below E_C). Majority carriers: Electrons (n ≈ N_D), Minority carriers: Holes (p = n_i^2 / N_D).
- P-Type: Doped with trivalent acceptors (Group III: Boron, Aluminum, Gallium, Indium). Acceptors introduce an empty state (E_a ≈ 0.045 eV above E_V) that accepts an electron from VB, creating a free hole. Majority carriers: Holes (p ≈ N_A), Minority carriers: Electrons (n = n_i^2 / N_A).`
      },
      {
        heading: '3. Mass-Action Law & Space Charge Neutrality',
        content: `Under thermal equilibrium (no external voltage or optical excitation applied):
- Mass-Action Law: n * p = n_i^2 (T). This product depends strictly on temperature T and material bandgap, completely independent of doping level!
- Space Charge Neutrality: The overall doped semiconductor remains electrostatically neutral:
  q * (N_D^+ + p) = q * (N_A^- + n) => n + N_A^- = p + N_D^+
Where N_D^+ is ionized donor density, and N_A^- is ionized acceptor density.`
      },
      {
        heading: '4. Carrier Transport: Drift, Diffusion & Einstein Relation',
        content: `Current in semiconductors flows via two distinct physical mechanisms:
1. Drift Current: Charged particles accelerated by an external electric field E:
   * Drift velocity: v_d,n = -mu_n * E, v_d,p = mu_p * E (where mu is mobility in cm^2/(V*s)).
   * Silicon at 300 K: mu_n ≈ 1350 cm^2/(V*s), mu_p ≈ 480 cm^2/(V*s). Electrons are ~3x faster than holes due to smaller effective mass.
   * Drift Current Density: J_drift = q * (n * mu_n + p * mu_p) * E = sigma * E, where sigma is conductivity.
2. Diffusion Current: Carrier movement from high concentration regions to low concentration regions due to random thermal Brownian motion:
   * Electron diffusion: J_diff,n = q * D_n * (dn/dx)
   * Hole diffusion: J_diff,p = -q * D_p * (dp/dx)
3. Total Current: J_total = J_drift + J_diff.
4. Einstein Relation: Connects diffusion coefficient D and mobility mu via thermal voltage V_T:
   D_n / mu_n = D_p / mu_p = V_T = (k * T) / q ≈ 25.86 mV at T = 300 K.`
      },
      {
        heading: '5. The Fermi-Dirac Distribution & Fermi Level E_F',
        content: `The probability that an available quantum energy state E is occupied by an electron at temperature T is given by Fermi-Dirac statistics:
f(E) = 1 / [1 + exp((E - E_F) / (k * T))]
- E_F (Fermi Energy / Fermi Level): The energy state where the probability of occupation is exactly 50% (f(E_F) = 0.5).
- In intrinsic semiconductors, E_F lies almost exactly midway between VB and CB (E_Fi ≈ (E_C + E_V)/2).
- In n-type semiconductors, excess donor electrons push E_F upwards toward E_C: E_F - E_Fi = k * T * ln(N_D / n_i).
- In p-type semiconductors, excess holes pull E_F downwards toward E_V: E_Fi - E_F = k * T * ln(N_A / n_i).
- As temperature rises significantly, n_i increases exponentially (n_i proportional to T^(3/2) * exp(-E_g / (2kT))). Eventually n_i >> N_D, causing extrinsic semiconductors to become intrinsic!`
      }
    ],
    importantDefinitions: [
      { term: 'Valence Band (VB)', definition: 'The highest energy band filled with valence electrons at 0 K that can participate in covalent bonding.' },
      { term: 'Conduction Band (CB)', definition: 'The lowest unoccupied energy band above the forbidden gap; electrons in CB are free to conduct current.' },
      { term: 'Energy Band Gap (E_g)', definition: 'The forbidden energy interval between VB and CB where no permitted electronic quantum states can exist (Si = 1.12 eV, Ge = 0.67 eV at 300K).' },
      { term: 'Intrinsic Semiconductor', definition: 'A chemically pure semiconductor crystal where the number of conduction electrons equals the number of holes (n = p = n_i).' },
      { term: 'Extrinsic Semiconductor', definition: 'A semiconductor doped with controlled pentavalent or trivalent impurities to drastically boost free electron or hole populations.' },
      { term: 'Donor Impurity', definition: 'Pentavalent Group V atoms (P, As, Sb) that donate an extra electron to the conduction band without creating a hole.' },
      { term: 'Acceptor Impurity', definition: 'Trivalent Group III atoms (B, Ga, In) that create an unoccupied valence bond state (hole) by accepting an electron.' },
      { term: 'Fermi Level (E_F)', definition: 'The thermodynamic chemical potential of electrons; the electrochemical energy state with a 50% occupation probability at equilibrium.' },
      { term: 'Carrier Mobility (mu)', definition: 'The proportionality factor between carrier drift velocity and applied electric field (v_d = mu * E), expressed in cm^2/(V·s).' },
      { term: 'Diffusion Coefficient (D)', definition: 'The constant relating carrier flux density to the spatial carrier concentration gradient (D = mu * V_T).' }
    ],
    circuitDiagram: `+--------------------------------------------------------------------------+
|                  ENERGY BAND DIAGRAMS AT ROOM TEMPERATURE                |
+--------------------------------------------------------------------------+

     INTRINSIC Si                    N-TYPE Si                    P-TYPE Si
  ==================== CB     ==================== CB     ==================== CB
                              - - - - - - - - - -  E_d
  -------------------- E_Fi   -------------------- E_F
                                                          -------------------- E_a
                                                          - - - - - - - - - -  E_F
  ==================== VB     ==================== VB     ==================== VB
   (E_F in middle)             (E_F near Conduction)       (E_F near Valence)
   Bandgap Eg = 1.12 eV        Donors: Ed ~ 0.045 eV       Acceptors: Ea ~ 0.045 eV

+--------------------------------------------------------------------------+
|                 CARRIER DRIFT VS DIFFUSION MECHANISM                     |
+--------------------------------------------------------------------------+

 DRIFT: E-field applied (E)          DIFFUSION: Concentration Gradient dn/dx
  (-) <================= (+)          High Density [ooo]  ----->  Low Density [   ]
  Electrons move:  <----              Electrons spread out due to thermal collisions
  Holes move:      ---->              Diffusion flux = -Dn * (dn/dx)`,
    stepByStepExamples: [
      {
        title: 'Step-by-Step Derivation: Thermal Equilibrium Carrier Densities',
        steps: [
          'Density of states in conduction band: N_c(E) = 4*pi * (2*m_n* / h^2)^(3/2) * sqrt(E - E_C).',
          'Electron density n = integral from E_C to infinity of [N_c(E) * f(E) dE].',
          'Using Boltzmann approximation when (E_C - E_F) >> 3*k*T: f(E) ≈ exp(-(E - E_F) / (k*T)).',
          'Integrating yields: n = N_C * exp(-(E_C - E_F) / (k*T)), where N_C is the effective density of states in CB (for Si: 2.8 x 10^19 cm^-3).',
          'Similarly for holes in VB: p = N_V * exp(-(E_F - E_V) / (k*T)), where N_V is effective density in VB (for Si: 1.04 x 10^19 cm^-3).',
          'Multiplying n and p gives: n * p = N_C * N_V * exp(-(E_C - E_V) / (k*T)) = N_C * N_V * exp(-E_g / (k*T)) = n_i^2. Proven!'
        ]
      }
    ],
    importantEquations: [
      { equation: 'n * p = n_i^2', description: 'Mass-Action Law (valid for non-degenerate semiconductors in thermal equilibrium)' },
      { equation: 'n_i = sqrt(N_C * N_V) * exp(-E_g / (2 * k * T))', description: 'Intrinsic carrier concentration vs temperature and bandgap' },
      { equation: 'J_drift = q * (n * mu_n + p * mu_p) * E', description: 'Total drift current density under applied electric field E' },
      { equation: 'J_diff = q * D_n * (dn/dx) - q * D_p * (dp/dx)', description: 'Total diffusion current density due to concentration gradients' },
      { equation: 'D_n / mu_n = D_p / mu_p = V_T = (k * T) / q', description: 'Einstein relation connecting diffusion constant to mobility' },
      { equation: 'E_F - E_Fi = k * T * ln(N_D / n_i)', description: 'Fermi level position relative to intrinsic level in n-type material' }
    ],
    numericalProblems: [
      {
        problem: 'A sample of Silicon at T = 300 K is doped with Phosphorus atoms at a density of N_D = 1.0 x 10^16 cm^-3. Given n_i = 1.5 x 10^10 cm^-3, mu_n = 1350 cm^2/(V*s), and mu_p = 480 cm^2/(V*s), calculate: (a) Majority and minority carrier concentrations, (b) Electrical conductivity sigma, and (c) Shift in Fermi level relative to intrinsic Fermi level.',
        solution: `(a) Phosphorus is pentavalent (donor). Assuming 100% ionization at 300 K:
Majority carrier density: n ≈ N_D = 1.0 x 10^16 cm^-3.
Minority carrier density p from mass-action law:
p = n_i^2 / n = (1.5 x 10^10)^2 / (1.0 x 10^16) = 2.25 x 10^20 / 1.0 x 10^16 = 2.25 x 10^4 cm^-3.

(b) Conductivity sigma = q * (n * mu_n + p * mu_p).
Since n >> p:
sigma ≈ q * n * mu_n = (1.6 x 10^-19 C) * (1.0 x 10^16 cm^-3) * (1350 cm^2/V*s)
sigma = 1.6 x 10^-3 * 1350 = 2.16 (Omega * cm)^-1 (or S/cm).
Resistivity rho = 1 / sigma = 1 / 2.16 ≈ 0.463 Omega*cm.

(c) Shift in Fermi level:
E_F - E_Fi = k * T * ln(N_D / n_i)
At 300 K, k*T = 0.02586 eV:
E_F - E_Fi = 0.02586 * ln(1.0 x 10^16 / 1.5 x 10^10) = 0.02586 * ln(6.67 x 10^5)
E_F - E_Fi = 0.02586 * 13.41 = +0.347 eV above the intrinsic Fermi level.`
      },
      {
        problem: 'For a Silicon sample with electron mobility mu_n = 1200 cm^2/(V*s) at 300 K, determine the electron diffusion coefficient D_n. If an electron concentration gradient dn/dx = -1.0 x 10^19 cm^-4 exists, find the electron diffusion current density J_diff,n.',
        solution: `1. Using Einstein relation:
D_n = mu_n * V_T = 1200 cm^2/(V*s) * 0.02586 V = 31.03 cm^2/s.

2. Electron diffusion current density:
J_diff,n = q * D_n * (dn/dx)
J_diff,n = (1.6 x 10^-19 C) * (31.03 cm^2/s) * (-1.0 x 10^19 cm^-4)
J_diff,n = -49.65 A/cm^2.
The negative sign indicates the electron diffusion current flows in the -x direction (electrons diffuse in +x direction, so conventional current is -x).`
      }
    ],
    applications: [
      'Silicon substrate preparation and chemical vapor deposition (CVD) in modern FinFET and GAAFET microprocessors.',
      'Photovoltaic solar cells: photon absorption creating electron-hole pairs across the bandgap.',
      'Thermistor and RTD sensor design utilizing the negative temperature coefficient (NTC) of semiconductor resistance.',
      'Photodetectors and optical interconnects engineered from direct bandgap semiconductors like InP and GaAs.'
    ],
    commonMistakes: [
      'Assuming extrinsic semiconductors possess a net electrical charge; donor ions (+q) and electrons (-q) balance exactly for zero net charge.',
      'Believing carrier mobility increases with temperature; at room temperature, lattice acoustic phonon scattering increases with T, reducing mobility (mu proportional to T^-1.5 to T^-2.5).',
      'Confusing drift and diffusion currents; drift requires an electric field, whereas diffusion requires a spatial concentration gradient.',
      'Forgetting that the mass-action law (n*p = n_i^2) applies exclusively in thermal equilibrium, not under optical injection or forward bias.'
    ],
    vivaQuestions: [
      {
        question: 'Why is Silicon preferred over Germanium in modern integrated circuit manufacturing?',
        answer: 'Silicon has a wider band gap (1.12 eV vs 0.67 eV for Ge), which results in a much lower intrinsic carrier concentration n_i and orders-of-magnitude lower reverse leakage current. Furthermore, Silicon naturally forms a stable, high-quality, insulating thermal oxide layer (SiO_2) crucial for planar MOSFET fabrication, and it operates reliably up to ~150-200°C compared to Ge (limited to ~75°C).'
      },
      {
        question: 'What is the physical meaning of the Fermi level at absolute zero (0 K)?',
        answer: 'At 0 K, the Fermi level represents the cutoff energy level below which all available quantum states are 100% occupied by electrons (f(E) = 1) and above which all states are completely vacant (f(E) = 0).'
      },
      {
        question: 'What is the difference between direct and indirect bandgap semiconductors?',
        answer: 'In direct bandgap semiconductors (e.g., GaAs), the minimum of the conduction band and maximum of the valence band align at the same crystal momentum (k = 0). Electrons can recombine with holes directly by emitting a photon (high radiative efficiency, ideal for LEDs/lasers). In indirect bandgap semiconductors (e.g., Si, Ge), the extrema occur at different k vectors; recombination requires a simultaneous lattice phonon (vibration) to conserve momentum, making light emission extremely inefficient.'
      }
    ],
    practiceMCQs: [
      {
        question: 'At room temperature (300 K), the intrinsic carrier concentration of Silicon is approximately:',
        options: ['1.5 x 10^10 cm^-3', '2.5 x 10^13 cm^-3', '1.0 x 10^16 cm^-3', '5.0 x 10^22 cm^-3'],
        correctAnswer: 0,
        explanation: 'For pure Silicon at 300 K, n_i is approximately 1.5 x 10^10 cm^-3 (for Germanium it is ~2.5 x 10^13 cm^-3).'
      },
      {
        question: 'When Silicon is doped with Boron at 300 K, the Fermi level E_F:',
        options: [
          'Moves toward the conduction band',
          'Moves toward the valence band',
          'Remains exactly at the intrinsic level E_Fi',
          'Enters deep inside the conduction band'
        ],
        correctAnswer: 1,
        explanation: 'Boron is a trivalent Group III acceptor creating excess holes in the valence band, pulling the Fermi level downward closer to E_V.'
      },
      {
        question: 'The Einstein relation between diffusion constant D and carrier mobility mu states that D / mu is proportional to:',
        options: ['T^2', '1 / T', 'Absolute temperature T', 'Independent of temperature'],
        correctAnswer: 2,
        explanation: 'D / mu = V_T = (k * T) / q. Thus D / mu is directly proportional to absolute temperature T in Kelvin.'
      }
    ],
    quickRevisionNotes: [
      'Si bandgap Eg = 1.12 eV, Ge = 0.67 eV, GaAs = 1.42 eV at 300 K.',
      'Intrinsic: n = p = n_i. Mass-Action Law: n * p = n_i^2 holds at equilibrium.',
      'Doping: N-type (Group V: P, As) => n ≈ N_D; P-type (Group III: B, Ga) => p ≈ N_A.',
      'Drift current: J_drift = q(n*mu_n + p*mu_p)E. Electron mobility in Si (~1350) is ~3x hole mobility (~480).',
      'Diffusion current: J_diff = q*Dn*(dn/dx) - q*Dp*(dp/dx).',
      'Einstein relationship: Dn/mu_n = Dp/mu_p = V_T = kT/q ≈ 26 mV at 300 K.'
    ]
  },

  'pn-junction': {
    id: 'pn-junction',
    subjectId: 'electronic_devices',
    order: 2,
    title: 'PN Junction',
    estimatedTime: '45 mins',
    learningObjectives: [
      'Trace the formation of the depletion region and derivation of built-in barrier potential V_0.',
      'Analyze the forward and reverse bias mechanics and calculate space-charge width W.',
      'Derive and utilize the Shockley ideal diode equation (I = I_0 * (exp(V / eta*V_T) - 1)).',
      'Distinguish transition capacitance C_T (reverse bias) from diffusion capacitance C_D (forward bias).',
      'Compare Avalanche breakdown and Zener breakdown mechanisms.'
    ],
    prerequisites: [
      'Semiconductor Physics: Doping, majority/minority carriers, drift and diffusion currents.',
      'Gauss\'s Law and Poisson\'s equation in electrostatics (d^2V/dx^2 = -rho/epsilon).'
    ],
    theoryAndConcepts: [
      {
        heading: '1. Formation of Depletion Region & Built-in Potential V_0',
        content: `When p-type and n-type semiconductor regions meet in an intimate single crystal:
1. Concentration Gradient Diffusion: High concentration of holes in p-side diffuses across the junction into n-side, while high concentration of electrons in n-side diffuses into p-side.
2. Uncompensated Ion Uncovering: Recombining carriers leave behind stationary, ionized impurity atoms:
   * In the n-side: positively charged donor ions (N_D^+).
   * In the p-side: negatively charged acceptor ions (N_A^-).
3. Depletion / Space-Charge Region (SCR): The central region stripped bare of mobile charge carriers. The uncovered ions set up a strong internal electric field directed from positive n-side ions to negative p-side ions (n to p).
4. Equilibrium Balance: The internal electric field drives a drift current that opposes and eventually balances carrier diffusion:
   J_drift + J_diff = 0 for both electrons and holes!
5. Built-in Barrier Potential (V_0 or V_bi):
   V_0 = V_T * ln((N_A * N_D) / n_i^2)
   At 300 K for Silicon, V_0 is typically 0.65 V to 0.8 V (for Ge, ~0.25 V to 0.35 V).`
      },
      {
        heading: '2. Space-Charge Width & Electric Field Profile',
        content: `Using 1D Poisson's equation d^2V/dx^2 = -rho(x)/epsilon_s with step junction approximation:
- Total depletion width: W = x_p + x_n = sqrt([(2 * epsilon_s) / q] * [1/N_A + 1/N_D] * (V_0 - V))
  where V is applied external bias (+V for forward, -V for reverse bias).
- Charge neutrality requires: q * N_A * x_p = q * N_D * x_n => x_p / x_n = N_D / N_A.
  The depletion layer penetrates deeper into the more lightly doped side!
- Maximum Electric Field occurs precisely at the metallurgical junction (x = 0):
  |E_max| = (2 * (V_0 - V)) / W`
      },
      {
        heading: '3. Bias Conditions: Forward vs. Reverse Bias',
        content: `External bias changes the electrostatic potential across the depletion layer:
1. Forward Bias (+ applied to p-side, - applied to n-side):
   * Applied voltage V_f opposes built-in potential; effective barrier lowers to (V_0 - V_f).
   * Depletion width W narrows significantly.
   * Majority carriers easily surmount the reduced barrier and inject into opposite regions as excess minority carriers.
   * Current rises exponentially with applied voltage: I = I_0 * (exp(V / (eta * V_T)) - 1).
2. Reverse Bias (+ applied to n-side, - applied to p-side):
   * Applied voltage V_r aids built-in potential; barrier height increases to (V_0 + V_r).
   * Depletion layer widens: W proportional to sqrt(V_0 + V_r).
   * Majority carrier diffusion drops to virtually zero.
   * Only thermally generated minority carriers near the junction edge get swept across by the strong electric field, creating a tiny, voltage-independent reverse saturation current I_0 (typically 10^-12 to 10^-9 A for Si at room temp).`
      },
      {
        heading: '4. Junction Capacitance: Transition C_T vs. Diffusion C_D',
        content: `A PN junction exhibits two distinct capacitive effects depending on bias mode:
1. Transition / Space-Charge Capacitance (C_T) - Dominant in Reverse Bias:
   * Arises from the dipole of uncovered fixed ions across the expanding depletion region (analogous to a parallel plate capacitor):
     C_T = (epsilon_s * A) / W = A * sqrt([(q * epsilon_s) / 2] * [N_A * N_D / (N_A + N_D)] * [1 / (V_0 + V_r)])
   * C_T decreases as reverse bias V_r increases (used intentionally in Varactor Diodes for electronic tuning).
2. Diffusion Capacitance (C_D) - Dominant in Forward Bias:
   * Arises from the storage of excess injected minority carriers in the neutral regions during forward conduction:
     C_D = (tau * I_D) / (eta * V_T)
   * where tau is minority carrier lifetime and I_D is forward current. C_D increases linearly with forward current and limits high-frequency switching speed.`
      }
    ],
    importantDefinitions: [
      { term: 'Depletion Region', definition: 'The space-charge layer around a PN junction depleted of mobile free carriers, containing uncovered fixed ionized dopants.' },
      { term: 'Built-in Potential (V_0)', definition: 'The contact potential difference formed across the junction at thermal equilibrium to counter diffusion (0.7V in Si).' },
      { term: 'Reverse Saturation Current (I_0)', definition: 'The tiny thermally generated minority carrier current that flows across the junction under reverse bias.' },
      { term: 'Transition Capacitance (C_T)', definition: 'Depletion layer capacitance dominant in reverse bias due to changes in stored space-charge with voltage (C_T = eps*A/W).' },
      { term: 'Diffusion Capacitance (C_D)', definition: 'Capacitance dominant under forward bias due to the storage of injected minority carriers in neutral bulk regions.' },
      { term: 'Ideality Factor (eta)', definition: 'A parameter ranging from 1 to 2 that accounts for recombination in the depletion layer (typically 1 for diffusion dominance, 2 for recombination).' },
      { term: 'Reverse Recovery Time (t_rr)', definition: 'The time required for a forward-conducting diode to clear stored minority carriers and switch off into reverse blocking state.' }
    ],
    circuitDiagram: `+--------------------------------------------------------------------------+
|                  PN JUNCTION DEPLETION LAYER SCHEMATIC                   |
+--------------------------------------------------------------------------+

               p-type neutral        Depletion Layer        n-type neutral
             +--------------------+---------------------+--------------------+
             |   Holes (o o o)    |  (-)  (-) | (+) (+) |  Electrons (- - -) |
             |   Acceptors (NA)   | Acceptor  |  Donor  |   Donors (ND)      |
             |                    |   Ions    |  Ions   |                    |
             +--------------------+-----------+---------+--------------------+
                                  <---- xp ---><-- xn -->
                                  <-------- W --------->
                                      E-field (n -> p)
                                            <------

              Energy Barrier (V0):
                     p-side                      n-side
                  ==============              ------------  q*V0
                                \\            /
                                 ============`,
    stepByStepExamples: [
      {
        title: 'Step-by-Step Derivation: Built-in Potential V_0',
        steps: [
          'At thermal equilibrium, total hole current across the junction is zero: J_p = J_p,drift + J_p,diff = 0.',
          'Substitute equations: q * p * mu_p * E - q * D_p * (dp/dx) = 0.',
          'Rearrange to express electric field: E(x) = (D_p / mu_p) * (1/p) * (dp/dx).',
          'Use Einstein relation (D_p / mu_p = V_T): E(x) = V_T * (1/p) * (dp/dx).',
          'Since E(x) = -dV/dx, integrate potential from p-neutral edge (-x_p) to n-neutral edge (x_n): V_0 = - integral from -x_p to x_n of E(x) dx = -V_T * integral from p_p to p_n of (1/p) dp.',
          'Evaluate integral: V_0 = V_T * ln(p_p / p_n).',
          'Substitute p_p ≈ N_A and minority density p_n = n_i^2 / N_D: V_0 = V_T * ln((N_A * N_D) / n_i^2). Q.E.D.'
        ]
      }
    ],
    importantEquations: [
      { equation: 'V_0 = V_T * ln((N_A * N_D) / n_i^2)', description: 'Built-in barrier potential at thermal equilibrium' },
      { equation: 'W = sqrt([2 * epsilon_s * (V_0 - V) / q] * [1/N_A + 1/N_D])', description: 'Total depletion region width under bias V' },
      { equation: 'x_p * N_A = x_n * N_D', description: 'Charge neutrality condition across depletion boundaries' },
      { equation: 'I = I_0 * [exp(V / (eta * V_T)) - 1]', description: 'Shockley ideal diode equation' },
      { equation: 'C_T = (epsilon_s * A) / W', description: 'Transition capacitance in reverse bias' },
      { equation: 'C_D = (tau * I_D) / (eta * V_T)', description: 'Diffusion capacitance in forward bias' }
    ],
    numericalProblems: [
      {
        problem: 'A Silicon abrupt PN junction has doping concentrations N_A = 2.0 x 10^16 cm^-3 on the p-side and N_D = 1.0 x 10^15 cm^-3 on the n-side. At T = 300 K, n_i = 1.5 x 10^10 cm^-3, and dielectric permittivity epsilon_s = 1.04 x 10^-12 F/cm. Calculate: (a) Built-in potential V_0, (b) Depletion layer width W at zero bias, and (c) Width W under a reverse bias of V_r = 5 V.',
        solution: `(a) Built-in potential V_0:
V_0 = V_T * ln((N_A * N_D) / n_i^2)
V_0 = 0.02586 * ln([(2.0 x 10^16) * (1.0 x 10^15)] / (1.5 x 10^10)^2)
V_0 = 0.02586 * ln(2.0 x 10^31 / 2.25 x 10^20) = 0.02586 * ln(8.889 x 10^10)
V_0 = 0.02586 * 25.21 = 0.652 V.

(b) Depletion layer width W at V = 0:
W_0 = sqrt([(2 * epsilon_s * V_0) / q] * (1/N_A + 1/N_D))
1/N_A + 1/N_D = 1/(2.0 x 10^16) + 1/(1.0 x 10^15) = 5.0 x 10^-17 + 100 x 10^-17 = 1.05 x 10^-15 cm^3.
Term = [2 * (1.04 x 10^-12 F/cm) * 0.652 V] / (1.6 x 10^-19 C) = 1.356 x 10^-12 / 1.6 x 10^-19 = 8.476 x 10^6 V*F/C.
W_0 = sqrt(8.476 x 10^6 * 1.05 x 10^-15) = sqrt(8.90 x 10^-9) = 9.43 x 10^-5 cm = 0.943 micro-meters.
Notice x_n >> x_p: depletion extends mostly into the lighter doped n-side (x_n = 20 * x_p).

(c) Depletion width under reverse bias V_r = 5 V:
Total effective potential = V_0 + V_r = 0.652 + 5 = 5.652 V.
W = W_0 * sqrt((V_0 + V_r) / V_0) = 0.943 * sqrt(5.652 / 0.652) = 0.943 * sqrt(8.669) = 0.943 * 2.944 = 2.78 micro-meters.`
      }
    ],
    applications: [
      'RF Varactor diodes: voltage-controlled tuning capacitors in VCOs and phase-locked loops (PLLs).',
      'PIN Diodes: high-frequency RF switches and optical attenuation modulators.',
      'Transient Voltage Suppressors (TVS): clamping high-voltage ESD spikes on sensitive digital lines.',
      'Solar panels and photodiode sensors: conversion of optical photons to electrical currents.'
    ],
    commonMistakes: [
      'Assuming the depletion region is symmetric; in real asymmetric junctions (p+n or n+p), W lies almost entirely in the lightly doped layer.',
      'Believing built-in potential V_0 can be measured with an ordinary digital multimeter; contact potentials at the metal-semiconductor probes cancel V_0 exactly at zero net current.',
      'Neglecting diffusion capacitance C_D at high frequencies; C_D causes significant phase lag and limits the cutoff frequency in forward-biased diodes.'
    ],
    vivaQuestions: [
      {
        question: 'Why does the reverse saturation current I_0 double approximately for every 10°C rise in temperature?',
        answer: 'The reverse saturation current is governed by the generation rate of minority carriers, which depends on n_i^2. Because n_i^2 is proportional to T^3 * exp(-E_g / kT), an increase in temperature causes an exponential increase in thermally generated electron-hole pairs, leading to an approximate 7% to 10% increase per °C, or a doubling every 10°C.'
      },
      {
        question: 'What is the physical cause of Avalanche breakdown?',
        answer: 'Avalanche breakdown occurs in lightly or moderately doped PN junctions under high reverse bias (> 6V). The intense electric field across the wide depletion layer accelerates thermally generated minority carriers to high kinetic energies. Upon colliding with valence electrons in the lattice, they knock them loose (impact ionization), creating new electron-hole pairs that accelerate and collide with others in a self-sustaining chain reaction (avalanche multiplication).'
      }
    ],
    practiceMCQs: [
      {
        question: 'In a p+n one-sided step junction (N_A >> N_D), the depletion layer width is determined primarily by:',
        options: ['N_A', 'N_D', 'The sum of N_A and N_D', 'Independent of doping'],
        correctAnswer: 1,
        explanation: 'Because N_A >> N_D, 1/N_A is negligible compared to 1/N_D, so W ≈ sqrt(2*eps*(V_0 - V)/(q*N_D)). The depletion layer extends almost entirely into the lightly doped n-side.'
      },
      {
        question: 'Under forward bias, the capacitance that dominates the PN junction behavior is:',
        options: ['Transition capacitance C_T', 'Diffusion capacitance C_D', 'Geometric stray capacitance', 'MOS capacitance'],
        correctAnswer: 1,
        explanation: 'Diffusion capacitance C_D arises from injected minority carrier charge storage and is proportional to forward current I_D, dominating over C_T under forward bias.'
      }
    ],
    quickRevisionNotes: [
      'Depletion region is formed by carrier diffusion and uncovered fixed ions (n-side + ions, p-side - ions).',
      'Built-in potential: V_0 = V_T * ln(N_A * N_D / n_i^2) ≈ 0.7 V for Si at 300 K.',
      'Depletion width W penetrates mostly into the lightly doped side (x_p / x_n = N_D / N_A).',
      'Forward bias reduces barrier to (V_0 - V_f); current rises exponentially (Shockley diode equation).',
      'Reverse bias widens barrier to (V_0 + V_r); only tiny minority leakage I_0 flows.',
      'Reverse bias: C_T dominates (eps*A/W). Forward bias: C_D dominates (tau*I_D / eta*V_T).'
    ]
  },

  'diodes': {
    id: 'diodes',
    subjectId: 'electronic_devices',
    order: 3,
    title: 'Diodes',
    estimatedTime: '45 mins',
    learningObjectives: [
      'Evaluate Ideal, Piecewise Linear, and Practical Diode equivalent models.',
      'Analyze Half-Wave, Center-Tapped Full-Wave, and Bridge Rectifier circuits with filter capacitors.',
      'Compute Rectifier Efficiency (eta), Ripple Factor (gamma), and Peak Inverse Voltage (PIV).',
      'Design Wave-Shaping circuits: Series/Parallel Clippers and Positive/Negative Clampers.',
      'Calculate capacitor filter ripple voltage and DC load voltage regulation.'
    ],
    prerequisites: [
      'PN junction V-I characteristics and turn-on threshold voltage (V_gamma = 0.7 V for Si).',
      'AC sinusoidal waveforms (V_m, V_rms, frequency f, time period T).',
      'Basic Kirchhoff\'s Voltage and Current Laws (KVL/KCL).'
    ],
    theoryAndConcepts: [
      {
        heading: '1. Diode Models: Ideal, Piecewise-Linear & Practical',
        content: `To analyze circuits containing non-linear diodes, engineers apply three standard approximations:
1. Ideal Diode Model:
   * Forward bias: Acts as a perfect closed switch (zero voltage drop, zero internal resistance: V_D = 0 V, r_f = 0).
   * Reverse bias: Acts as a perfect open switch (infinite resistance, zero current: I_D = 0).
2. Practical / Simplified Model:
   * Accounts for the knee/barrier voltage V_gamma (0.7 V for Si, 0.3 V for Ge).
   * When forward biased with V > V_gamma, replaces diode with a 0.7 V DC opposing voltage source.
   * When V < V_gamma, remains an open circuit.
3. Piecewise-Linear Model:
   * Accounts for knee voltage V_gamma plus small forward dynamic bulk resistance r_d:
     V_D = V_gamma + I_D * r_d (where r_d = Delta V_D / Delta I_D = eta * V_T / I_D).`
      },
      {
        heading: '2. Rectifier Circuits: Half-Wave, Full-Wave & Bridge',
        content: `Rectification converts alternating current (AC) to pulsating direct current (DC):
1. Half-Wave Rectifier (HWR):
   * Conduction occurs only during positive half cycle (0 to pi).
   * Average DC voltage: V_dc = V_m / pi ≈ 0.318 * V_m.
   * RMS voltage: V_rms = V_m / 2 = 0.5 * V_m.
   * Ripple Factor: gamma = sqrt((V_rms/V_dc)^2 - 1) = 1.21 (121% AC ripple!).
   * Maximum Efficiency: eta_max = 40.6%.
   * Peak Inverse Voltage: PIV = V_m.
   * Output frequency: f_out = f_in (e.g., 50 Hz).
2. Full-Wave Center-Tapped Rectifier:
   * Uses 2 diodes and a center-tapped secondary transformer winding.
   * Both half cycles conduct (D1 in positive, D2 in negative).
   * V_dc = 2 * V_m / pi ≈ 0.636 * V_m.
   * V_rms = V_m / sqrt(2) ≈ 0.707 * V_m.
   * Ripple Factor: gamma = 0.482 (48.2%).
   * Maximum Efficiency: eta_max = 81.2%.
   * PIV across non-conducting diode: PIV = 2 * V_m!
   * Output frequency: f_out = 2 * f_in (e.g., 100 Hz).
3. Full-Wave Bridge Rectifier:
   * Uses 4 diodes in a bridge arrangement (D1-D2 and D3-D4 conduct in alternating pairs).
   * Eliminates the bulky, expensive center-tapped transformer!
   * V_dc = (2 * V_m / pi) - 2 * V_gamma ≈ 0.636 * V_m.
   * Ripple Factor: gamma = 0.482.
   * Maximum Efficiency: eta_max = 81.2%.
   * PIV across non-conducting diodes: PIV = V_m (half that of the center-tapped design!).
   * Output frequency: f_out = 2 * f_in.`
      },
      {
        heading: '3. Filter Circuits & Ripple Reduction',
        content: `Pulsating DC is smoothed using a reservoir capacitor filter C placed in parallel with load R_L:
- The capacitor charges to peak voltage V_m during diode conduction and discharges slowly through R_L between peaks.
- Peak-to-peak ripple voltage: V_r(p-p) = V_m / (2 * f * R_L * C) = I_dc / (2 * f * C) (for full-wave).
- Average DC output voltage: V_dc = V_m - V_r(p-p) / 2 = V_m - I_dc / (4 * f * C).
- Ripple Factor with C-Filter: gamma = 1 / (4 * sqrt(3) * f * R_L * C).`
      },
      {
        heading: '4. Wave-Shaping: Clippers & Clampers',
        content: `1. Clippers (Limiters): Circuits that clip/remove portions of an AC signal above or below a predetermined reference voltage without distorting the remaining wave:
   * Positive Clipper: Diode in series or parallel turns on during positive peak, clipping output to 0 V (or V_bias).
   * Negative Clipper: Clips negative half cycles.
   * Biased Clipper: Incorporates DC reference voltage V_ref to clip at desired thresholds.
2. Clampers (DC Restorers): Circuits consisting of a diode, capacitor, and resistor that clamp the positive or negative peak of a waveform to a specified DC reference level without altering its peak-to-peak amplitude (V_p-p remains unchanged!):
   * Positive Clamper: Shifts waveform upward so negative peaks rest at 0 V.
   * Negative Clamper: Shifts waveform downward so positive peaks rest at 0 V.`
      }
    ],
    importantDefinitions: [
      { term: 'Rectification', definition: 'The process of converting bidirectional alternating voltage/current into unidirectional pulsating direct voltage/current.' },
      { term: 'Ripple Factor (gamma)', definition: 'The ratio of the RMS value of AC ripple components present in the output to the average DC value (gamma = V_ac,rms / V_dc).' },
      { term: 'Peak Inverse Voltage (PIV)', definition: 'The maximum reverse voltage that appears across a diode when it is reverse-biased in a rectifier circuit.' },
      { term: 'Transformer Utilization Factor (TUF)', definition: 'The ratio of DC output power delivered to the load to the AC rating of the transformer secondary winding (P_dc / P_ac,rated).' },
      { term: 'Clipper Circuit', definition: 'A non-linear wave-shaping circuit that cuts off portions of an input signal above or below a chosen reference voltage level.' },
      { term: 'Clamper Circuit', definition: 'A circuit comprising a capacitor, diode, and resistor that adds a DC offset to an AC signal while keeping peak-to-peak amplitude intact.' }
    ],
    circuitDiagram: `+--------------------------------------------------------------------------+
|                  BRIDGE RECTIFIER WITH CAPACITOR FILTER                  |
+--------------------------------------------------------------------------+

           AC Mains ~
             |  |
         +---+  +---+
         |          |
      (~)o--+  D1 +--+--o(+)-------------------+---------------+
            |  +--+  |                         |               |
           D4  |     D2                      + |             + |
            |  +--+  |                     [ C ] Filter     [ R_L ] Load
      (~)o--+  D3 +--+--o(-)-------------------|---------------|
         |          |                          |               |
         +----------+                         GND             GND

       D1, D3 conduct on (+) half-cycle: Current flows through R_L top to bottom.
       D2, D4 conduct on (-) half-cycle: Current STILL flows top to bottom!
       DC output: V_dc ≈ 2*Vm/pi - 2*V_gamma`,
    stepByStepExamples: [
      {
        title: 'Step-by-Step Analysis: Biased Parallel Clipper Circuit',
        steps: [
          'Input: AC sine wave V_in(t) = 10 * sin(omega * t).',
          'Circuit: Input resistor R = 1 kOmega in series. Output taken across a parallel branch having a diode pointing UP in series with a +3 V DC voltage source.',
          'State 1 (Diode OFF): When V_in < 3 V + 0.7 V = 3.7 V, the cathode is at higher potential than the anode. The diode is reverse-biased (open circuit).',
          'Output voltage for V_in < 3.7 V: V_out = V_in (no current through R).',
          'State 2 (Diode ON): When V_in >= 3.7 V, the diode turns forward-biased (acts as short with 0.7 V drop).',
          'Output voltage for V_in >= 3.7 V: V_out is clamped to +3 V + 0.7 V = +3.7 V!',
          'Result: The positive peak is neatly clipped flat at +3.7 V, while the entire remainder of the waveform from -10 V to +3.7 V passes unaffected.'
        ]
      }
    ],
    importantEquations: [
      { equation: 'V_dc (Half-Wave) = V_m / pi = 0.318 * V_m', description: 'Average DC voltage of half-wave rectifier' },
      { equation: 'V_dc (Full-Wave) = (2 * V_m) / pi = 0.636 * V_m', description: 'Average DC voltage of full-wave rectifier' },
      { equation: 'gamma = sqrt((V_rms / V_dc)^2 - 1)', description: 'General definition of ripple factor' },
      { equation: 'PIV(Bridge) = V_m, PIV(Center-Tap) = 2 * V_m', description: 'Peak Inverse Voltage comparison' },
      { equation: 'V_r(p-p) = I_dc / (2 * f * C)', description: 'Peak-to-peak ripple voltage for full-wave rectifier with capacitor filter' },
      { equation: 'eta = (P_dc / P_ac) * 100%', description: 'Rectification efficiency' }
    ],
    numericalProblems: [
      {
        problem: 'A Bridge Rectifier is supplied from a 230 V, 50 Hz AC mains via a 10:1 step-down transformer. The load resistor is R_L = 500 Omega. Assuming practical Silicon diodes each with a forward drop of V_gamma = 0.7 V: (a) Find peak secondary voltage V_m, (b) Calculate DC output voltage V_dc and DC load current I_dc, (c) Determine PIV rating for each diode, and (d) Find capacitor value C needed for a peak-to-peak ripple V_r(p-p) <= 1.0 V.',
        solution: `(a) Secondary RMS voltage:
V_sec,rms = 230 V / 10 = 23 V.
Peak secondary voltage:
V_m = sqrt(2) * V_sec,rms = 1.414 * 23 V = 32.53 V.

(b) In a bridge rectifier, two diodes conduct simultaneously in series during each half cycle:
Peak output voltage across load:
V_m,out = V_m - 2 * V_gamma = 32.53 - 2 * 0.7 = 31.13 V.
DC output voltage:
V_dc = (2 * V_m,out) / pi = (2 * 31.13) / 3.1416 = 19.82 V.
DC load current:
I_dc = V_dc / R_L = 19.82 V / 500 Omega = 39.64 mA.

(c) PIV for each diode in a bridge rectifier:
PIV = V_m - V_gamma = 32.53 - 0.7 = 31.83 V (Safety factor typically requires rating >= 50 V).

(d) Required filter capacitor value:
For full-wave rectifier, frequency of ripple is f_r = 2 * 50 Hz = 100 Hz.
V_r(p-p) = I_dc / (2 * f * C) = I_dc / (f_r * C)
C = I_dc / (f_r * V_r(p-p)) = (39.64 x 10^-3 A) / (100 Hz * 1.0 V)
C = 39.64 x 10^-5 F = 396.4 micro-Farads (standard value: 470 micro-Farads, 50 V).`
      }
    ],
    applications: [
      'AC-to-DC power adapters and linear/switch-mode power supplies (SMPS) for laptops and smartphones.',
      'Flyback / freewheeling diodes connected across inductive relay coils and DC motors to prevent back-EMF destruction.',
      'AM radio detector circuits: envelope detection stripping RF carrier to recover audio signal.',
      'Over-voltage ESD protection rails on micro-controller I/O pins using diode clamps to V_DD and GND.'
    ],
    commonMistakes: [
      'Forgetting the two-diode forward drop (2 * 0.7 V = 1.4 V) in bridge rectifiers when calculating DC output voltage.',
      'Overlooking that the PIV of a center-tapped full-wave rectifier is 2 * V_m, leading to diode breakdown if standard V_m rated diodes are used.',
      'Assuming capacitor filters completely eliminate ripple; ripple voltage always exists and is directly proportional to load current I_dc.',
      'Confusing clippers with clampers: clippers change the waveform shape by cutting peaks, while clampers preserve shape and shift the DC reference level.'
    ],
    vivaQuestions: [
      {
        question: 'Why is a Bridge Rectifier preferred over a Center-Tapped Full-Wave Rectifier in almost all modern power supplies?',
        answer: 'The Bridge Rectifier does not require a bulky, expensive center-tapped transformer, and the Peak Inverse Voltage (PIV) rating required for its diodes is only V_m (compared to 2 * V_m in a center-tapped design). This allows the use of cheaper diodes with lower voltage ratings and smaller overall system size.'
      },
      {
        question: 'What is the purpose of a Bleeder Resistor in a capacitor filter circuit?',
        answer: 'A bleeder resistor is connected in parallel with the filter capacitor to: (1) provide a safe discharge path for stored high-voltage charge when the equipment is turned off, protecting technicians from electrical shock, and (2) improve voltage regulation by ensuring a minimum baseline load current flows at all times.'
      }
    ],
    practiceMCQs: [
      {
        question: 'The ripple factor of an ideal full-wave bridge rectifier without a filter is:',
        options: ['1.21', '0.482', '0.812', '0.05'],
        correctAnswer: 1,
        explanation: 'For a full-wave rectifier, the ripple factor gamma = sqrt((V_rms/V_dc)^2 - 1) = sqrt((0.707/0.636)^2 - 1) ≈ 0.482.'
      },
      {
        question: 'If the input frequency to a center-tapped full-wave rectifier is 60 Hz, the output ripple frequency is:',
        options: ['30 Hz', '60 Hz', '120 Hz', '240 Hz'],
        correctAnswer: 2,
        explanation: 'In full-wave rectification, both positive and negative half-cycles are inverted into positive pulses, doubling the output fundamental frequency: f_out = 2 * f_in = 2 * 60 = 120 Hz.'
      }
    ],
    quickRevisionNotes: [
      'Diode models: Ideal (V=0, R=0), Practical (V_gamma = 0.7V), Piecewise linear (V_gamma + I_D*r_d).',
      'HWR: V_dc = V_m/pi (31.8%), gamma = 1.21, eta_max = 40.6%, PIV = V_m, f_out = f_in.',
      'FWR Center-Tapped: V_dc = 2*V_m/pi (63.6%), gamma = 0.482, eta_max = 81.2%, PIV = 2*V_m, f_out = 2*f_in.',
      'FWR Bridge: V_dc = 2*V_m/pi - 1.4V, gamma = 0.482, eta_max = 81.2%, PIV = V_m, no center tap needed!',
      'Capacitor filter ripple: V_r(p-p) = I_dc / (2*f*C). Higher capacitance = lower ripple.',
      'Clippers limit/cut waveform sections; clampers add a DC shift without changing peak-to-peak amplitude.'
    ]
  },

  'zener-diode': {
    id: 'zener-diode',
    subjectId: 'electronic_devices',
    order: 4,
    title: 'Zener Diode',
    estimatedTime: '40 mins',
    learningObjectives: [
      'Compare quantum mechanical Zener tunneling vs. Avalanche impact ionization breakdown mechanisms.',
      'Interpret the reverse V-I characteristic curve, knee current I_ZK, and dynamic resistance r_Z.',
      'Design a Zener shunt voltage regulator calculating minimum and maximum series resistance R_S.',
      'Analyze Line Regulation and Load Regulation performance under fluctuating input voltage and load current.',
      'Evaluate temperature coefficient effects on Zener diode breakdown voltages.'
    ],
    prerequisites: [
      'PN junction reverse bias mechanics and depletion layer width dependence on doping.',
      'Thevenin equivalent circuits and basic Ohm\'s/Kirchhoff\'s laws.'
    ],
    theoryAndConcepts: [
      {
        heading: '1. Zener vs. Avalanche Breakdown Mechanisms',
        content: `A Zener diode is a heavily doped PN junction designed specifically to operate safely in its reverse breakdown region without damage:
1. Zener Breakdown (Direct Quantum Tunneling):
   * Occurs in very heavily doped PN junctions (doping ~ 1 in 10^4 atoms).
   * Because of heavy doping, the depletion layer is extraordinarily thin (W < 10 nm ≈ 100 Angstroms).
   * Even a modest reverse voltage (< 5-6 V) establishes an immense electric field across the junction:
     E = V / W > 10^7 V/m = 10^5 V/cm.
   * This field is strong enough to directly pull valence electrons out of covalent bonds and tunnel them through the thin barrier into the conduction band (Zener quantum tunneling).
   * Temperature Coefficient: Negative (as T increases, bandgap slightly narrows, requiring lower V_Z).
2. Avalanche Breakdown (Impact Ionization):
   * Occurs in lightly or moderately doped PN junctions where depletion region is wider (> 6 V).
   * Lower electric field is insufficient for direct tunneling. Instead, minority carriers accelerate, acquire high kinetic energy, and knock off valence electrons by impact ionization.
   * Temperature Coefficient: Positive (increased lattice thermal vibrations scatter carriers, requiring higher V_Z to reach ionizing kinetic energy).
- At around V_Z ≈ 5.6 V, the two temperature coefficients cancel out, creating ultra-stable reference diodes!`
      },
      {
        heading: '2. V-I Characteristics & Operating Regions',
        content: `Under forward bias, a Zener diode behaves just like a standard Silicon diode (turn-on at ~0.7 V).
Under reverse bias:
1. Pre-breakdown region: Tiny reverse leakage current flows until the breakdown knee voltage V_Z is reached.
2. Knee Current (I_ZK): The minimum reverse current required to enter the stable breakdown region.
3. Breakdown / Regulation Region: Once V >= V_Z, current increases drastically while the voltage across the diode remains virtually constant at V_Z.
4. Maximum Current Rating (I_ZM): Limited by maximum permissible power dissipation:
   I_ZM = P_Z,max / V_Z.
   Exceeding I_ZM causes catastrophic thermal destruction.
5. Dynamic Zener Impedance: r_Z = Delta V_Z / Delta I_Z (typically 1 to 20 Omega). Lower r_Z means superior voltage regulation.`
      },
      {
        heading: '3. Zener Shunt Voltage Regulator Design',
        content: `A Zener diode connected in parallel (shunt) with a load R_L maintains a constant output voltage V_out = V_Z despite variations in input unregulated voltage V_in and load current I_L:
Circuit operation:
- Series resistor R_S drops the excess input voltage: V_in - V_Z = I_S * R_S.
- By KCL: I_S = I_Z + I_L.
- For the regulator to hold V_out = V_Z under all conditions:
  1. Diode must never turn OFF (I_Z >= I_ZK under minimum input voltage V_in,min and maximum load current I_L,max):
     R_S,max = (V_in,min - V_Z) / (I_ZK + I_L,max)
  2. Diode must never OVERHEAT (I_Z <= I_ZM under maximum input voltage V_in,max and minimum load current I_L,min = 0):
     R_S,min = (V_in,max - V_Z) / (I_ZM + I_L,min)`
      },
      {
        heading: '4. Line and Load Regulation Metrics',
        content: `The quality of a voltage regulator is quantified by two figures of merit:
1. Line Regulation (Delta V_out / Delta V_in): Measures output voltage change for a given change in input voltage while load R_L remains constant:
   Line Regulation = Delta V_out / Delta V_in = r_Z / (R_S + r_Z)
2. Load Regulation (% change in V_out from no-load to full-load):
   % Load Regulation = [(V_NL - V_FL) / V_FL] * 100%
   where V_NL is no-load voltage (I_L = 0) and V_FL is full-load voltage (I_L = I_L,max).`
      }
    ],
    importantDefinitions: [
      { term: 'Zener Diode', definition: 'A heavily doped semiconductor diode designed to operate continuously and stably in the reverse breakdown region.' },
      { term: 'Zener Breakdown', definition: 'Breakdown in heavily doped junctions (< 6V) where a high electric field tunnels electrons directly through a thin barrier.' },
      { term: 'Avalanche Breakdown', definition: 'Breakdown in lightly doped junctions (> 6V) caused by accelerated carrier impact ionization creating carrier multiplication.' },
      { term: 'Knee Current (I_ZK)', definition: 'The minimum reverse current required to establish steady breakdown and maintain voltage regulation.' },
      { term: 'Dynamic Resistance (r_Z)', definition: 'The reciprocal of the slope of the reverse V-I breakdown characteristic: r_Z = Delta V_Z / Delta I_Z.' },
      { term: 'Voltage Regulation', definition: 'The ability of a circuit to maintain constant output voltage despite fluctuations in input line voltage or output load current.' }
    ],
    circuitDiagram: `+--------------------------------------------------------------------------+
|                  ZENER SHUNT VOLTAGE REGULATOR CIRCUIT                   |
+--------------------------------------------------------------------------+

                  Series Resistor R_S
        o----------[ R_S ]-----------+----------------o (+)
     (+)                             |                 |
     Unregulated                     | +               | +
     DC Input (V_in)               [---] Zener       [---] Load R_L
                                    / \\  Diode        | |  Output V_out = V_Z
     (-)                             | -               | -
        o----------------------------+----------------o (-)
                                    GND

       Governing Equations:
       1) I_S = (V_in - V_Z) / R_S
       2) I_S = I_Z + I_L
       3) V_out = V_Z (constant)`,
    stepByStepExamples: [
      {
        title: 'Step-by-Step Procedure: Testing Whether Zener Regulates',
        steps: [
          'Given: Input voltage V_in, series resistor R_S, load resistor R_L, and Zener voltage V_Z.',
          'Step 1: Temporarily remove the Zener diode from the circuit to calculate open-circuit Thevenin voltage V_th across the load.',
          'Step 2: By voltage divider: V_th = V_in * [R_L / (R_S + R_L)].',
          'Step 3: Compare V_th with V_Z:',
          '  * If V_th < V_Z: The input voltage is insufficient to break down the diode. The Zener is OFF (I_Z = 0) and V_out = V_th.',
          '  * If V_th >= V_Z: The Zener is in breakdown (ON). V_out is clamped to V_Z!',
          'Step 4: Once ON, calculate currents: I_L = V_Z / R_L, I_S = (V_in - V_Z) / R_S, and I_Z = I_S - I_L.',
          'Step 5: Verify that I_Z >= I_ZK and I_Z <= I_ZM.'
        ]
      }
    ],
    importantEquations: [
      { equation: 'V_out = V_Z', description: 'Regulated output voltage when diode is in breakdown' },
      { equation: 'I_S = (V_in - V_Z) / R_S = I_Z + I_L', description: 'Kirchhoff\'s current law at the regulator output node' },
      { equation: 'R_S,max = (V_in,min - V_Z) / (I_ZK + I_L,max)', description: 'Maximum allowable series resistance to prevent Zener dropout' },
      { equation: 'R_S,min = (V_in,max - V_Z) / (I_ZM + I_L,min)', description: 'Minimum allowable series resistance to prevent Zener burnout' },
      { equation: 'P_Z,max = V_Z * I_ZM', description: 'Maximum power dissipation rating of the Zener diode' }
    ],
    numericalProblems: [
      {
        problem: 'A 10 V Zener diode with P_Z,max = 500 mW and knee current I_ZK = 5 mA is used in a shunt regulator circuit. The unregulated input voltage varies between 15 V and 20 V, and the load current varies from 0 mA to 25 mA. Design the series resistor R_S (find the safe range of R_S) and calculate maximum Zener power dissipation.',
        solution: `1. Calculate maximum allowable Zener current I_ZM:
I_ZM = P_Z,max / V_Z = 500 mW / 10 V = 50 mA.

2. Determine maximum allowable series resistance R_S,max:
Occurs at minimum input voltage V_in,min = 15 V and maximum load current I_L,max = 25 mA:
R_S,max = (V_in,min - V_Z) / (I_ZK + I_L,max)
R_S,max = (15 V - 10 V) / (5 mA + 25 mA) = 5 V / 30 mA = 166.7 Omega.

3. Determine minimum allowable series resistance R_S,min:
Occurs at maximum input voltage V_in,max = 20 V and minimum load current I_L,min = 0 mA:
R_S,min = (V_in,max - V_Z) / (I_ZM + I_L,min)
R_S,min = (20 V - 10 V) / (50 mA + 0 mA) = 10 V / 50 mA = 200 Omega!

Notice: Here R_S,min (200 Omega) > R_S,max (166.7 Omega), meaning a 500 mW Zener diode cannot handle the full swing simultaneously with zero load.
If we select R_S = 180 Omega, minimum load current cannot be zero.
Let\'s calculate actual P_Z under R_S = 180 Omega at V_in = 20 V and I_L = 10 mA:
I_S = (20 - 10) / 180 = 55.5 mA.
I_Z = 55.5 - 10 = 45.5 mA <= 50 mA (Safe!).
Actual P_Z = 10 V * 45.5 mA = 455 mW < 500 mW.`
      }
    ],
    applications: [
      'Stable DC voltage references for Analog-to-Digital Converters (ADCs) and operational amplifier circuits.',
      'Over-voltage surge protection clamping sensitive micro-controller input pins against electrostatic spikes.',
      'Waveform clipping / square-wave generation using back-to-back bidirectional Zener diodes.',
      'Biasing networks in precision analog voltage regulators and bandgap references.'
    ],
    commonMistakes: [
      'Connecting a Zener diode directly across a DC voltage source without a series current-limiting resistor R_S, causing instant thermal destruction.',
      'Assuming Zener voltage is strictly independent of current; dynamic resistance r_Z causes V_Z to increase slightly as I_Z rises (Delta V_Z = Delta I_Z * r_Z).',
      'Confusing the temperature coefficient: breakdown voltages below 5V (Zener) have negative tempco, while above 6V (Avalanche) have positive tempco.'
    ],
    vivaQuestions: [
      {
        question: 'Why does a Zener diode have a sharp breakdown while an ordinary diode breakdown is softer?',
        answer: 'Zener diodes are manufactured with extremely high and uniform doping profiles on both sides of the junction, yielding an abrupt, ultra-thin depletion region (~10 nm). This ensures a high, uniform electric field across the entire junction area, triggering simultaneous quantum tunneling across all covalent bonds at an exact, sharply defined threshold voltage.'
      },
      {
        question: 'How do you create a zero-temperature-coefficient Zener voltage reference?',
        answer: 'By selecting a diode with a breakdown voltage around 5.6 V, where the negative temperature coefficient of Zener tunneling exactly cancels the positive temperature coefficient of Avalanche multiplication. Alternatively, a forward-biased PN diode (-2 mV/°C) is placed in series with an Avalanche Zener diode (~+2 mV/°C) to cancel temperature drift.'
      }
    ],
    practiceMCQs: [
      {
        question: 'Zener breakdown in a PN junction occurs primarily when the reverse breakdown voltage is:',
        options: ['Greater than 10 V', 'Less than 5 to 6 V', 'Between 50 V and 100 V', 'Only at 0 V'],
        correctAnswer: 1,
        explanation: 'Direct quantum tunneling (Zener breakdown) dominates in heavily doped junctions where the breakdown voltage is below 5-6 V. Above 6 V, impact ionization (Avalanche breakdown) dominates.'
      },
      {
        question: 'In a Zener shunt regulator, if the load resistor R_L is disconnected (no-load condition), the current through the Zener diode will:',
        options: ['Drop to zero', 'Remain unchanged', 'Increase to its maximum value', 'Oscillate'],
        correctAnswer: 2,
        explanation: 'Because I_S = (V_in - V_Z) / R_S is constant for a given V_in, when I_L drops to zero (open circuit), all source current must divert into the Zener diode (I_Z = I_S), reaching its maximum value.'
      }
    ],
    quickRevisionNotes: [
      'Zener breakdown (< 6V): Heavy doping, thin depletion (< 10nm), quantum tunneling, negative tempco.',
      'Avalanche breakdown (> 6V): Moderate doping, impact ionization chain reaction, positive tempco.',
      'Zero tempco reference at ~5.6 V where both mechanisms balance.',
      'Zener shunt regulator: Maintains V_out = V_Z. Series resistor R_S limits total current: I_S = I_Z + I_L.',
      'R_S must satisfy: (V_in,max - V_Z)/I_ZM <= R_S <= (V_in,min - V_Z)/(I_ZK + I_L,max).'
    ]
  },

  'bjt': {
    id: 'bjt',
    subjectId: 'electronic_devices',
    order: 5,
    title: 'BJT',
    estimatedTime: '50 mins',
    learningObjectives: [
      'Explain the physical structure, doping asymmetry, and transistor action in NPN and PNP BJTs.',
      'Derive fundamental current relations: I_E = I_B + I_C, I_C = alpha * I_E + I_CBO, and I_C = beta * I_B + I_CEO.',
      'Distinguish the four operating regions (Active, Cutoff, Saturation, Inverted Active) based on junction bias.',
      'Analyze Common Emitter (CE), Common Base (CB), and Common Collector (CC) configurations and characteristics.',
      'Evaluate the Early effect (base-width modulation) and its impact on output resistance r_o.'
    ],
    prerequisites: [
      'PN junction forward and reverse bias mechanics and minority carrier injection.',
      'Basic linear circuit analysis (Thevenin equivalents, Kirchhoff\'s laws).'
    ],
    theoryAndConcepts: [
      {
        heading: '1. Physical Structure & Doping Asymmetry',
        content: `A Bipolar Junction Transistor (BJT) is a three-terminal semiconductor device formed by two back-to-back PN junctions (Emitter-Base Junction EBJ, and Collector-Base Junction CBJ). It is called "bipolar" because conduction involves both majority and minority carriers (electrons and holes):
1. Emitter (E): Heavily doped (n+ or p+) to inject an overwhelming quantity of majority carriers into the base. Moderate physical size.
2. Base (B): Extremely thin (typically < 1 micro-meter, much shorter than the minority carrier diffusion length L_B) and lightly doped. This minimizes carrier recombination so that >99% of injected carriers reach the collector.
3. Collector (C): Moderately doped and physically the largest region to safely dissipate heat generated by collecting energetic carriers.
Two types exist: NPN (Emitter: n+, Base: p, Collector: n) and PNP (Emitter: p+, Base: n, Collector: p). NPN is widely preferred because electron mobility in Silicon is ~3x higher than hole mobility, resulting in higher speed and transconductance.`
      },
      {
        heading: '2. Transistor Action & Current Relationships',
        content: `Consider an NPN transistor biased in the Forward Active Mode (EBJ forward biased, CBJ reverse biased):
1. Injection: The forward-biased EBJ causes the heavily doped n+ Emitter to inject a massive flux of electrons into the thin p-type Base.
2. Diffusion through Base: Because the Base is extremely thin and lightly doped, only a tiny fraction (~0.5% to 2%) recombines with holes in the Base to form the external Base current I_B.
3. Collection: The remaining ~98% to 99.5% of electrons diffuse across the base, reach the edge of the CBJ depletion layer, and are swept across into the Collector by the strong reverse electric field.
4. Current Equations:
   * By KCL: I_E = I_B + I_C
   * In Common Base: I_C = alpha * I_E + I_CBO (where alpha is the common-base current gain, typically 0.98 to 0.998, and I_CBO is the collector-base reverse saturation current with emitter open).
   * In Common Emitter: Substituting I_E = I_B + I_C yields:
     I_C = beta * I_B + I_CEO
     where beta (common-emitter current gain or h_FE) = alpha / (1 - alpha), typically 50 to 300, and I_CEO = (beta + 1) * I_CBO.`
      },
      {
        heading: '3. The Four Operating Modes/Regions',
        content: `A BJT operates in four distinct states depending on the bias applied across its two junctions:
1. Forward Active Region (EBJ Forward, CBJ Reverse):
   * Linear amplification mode. I_C = beta * I_B. Acts as a voltage-controlled current source (or current amplifier).
2. Cutoff Region (EBJ Reverse, CBJ Reverse):
   * Both junctions reverse biased. I_B ≈ 0, I_C ≈ I_CEO ≈ 0. Transistor acts as an OPEN switch.
3. Saturation Region (EBJ Forward, CBJ Forward):
   * Both junctions forward biased. Transistor is fully ON, passing maximum current.
   * Collector-emitter voltage drops to V_CE,sat ≈ 0.2 V. Current is limited strictly by external load: I_C,sat < beta * I_B. Acts as a CLOSED switch.
4. Reverse/Inverted Active Region (EBJ Reverse, CBJ Forward):
   * Swapped roles (Collector acts as emitter). Inefficient because collector is lightly doped; yields very low current gain (beta_r ~ 0.1 to 2). Used rarely (e.g. in TTL logic inputs).`
      },
      {
        heading: '4. BJT Configurations: CE, CB, and CC',
        content: `1. Common Emitter (CE):
   * Input: Base, Output: Collector, Common: Emitter.
   * Characteristics: High voltage gain A_v, high current gain A_i = beta, high power gain, moderate input impedance (~1-5 kOmega), moderate output impedance (~50 kOmega).
   * 180° phase inversion between input and output voltage. Most widely used amplifier configuration!
2. Common Base (CB):
   * Input: Emitter, Output: Collector, Common: Base.
   * Characteristics: High voltage gain, unity current gain (alpha < 1), lowest input impedance (~10-50 Omega), highest output impedance (~1 MOmega).
   * 0° phase shift. Ideal for high-frequency RF amplification and current buffers.
3. Common Collector (CC / Emitter Follower):
   * Input: Base, Output: Emitter, Common: Collector.
   * Characteristics: High current gain (beta + 1), near-unity voltage gain (A_v ≈ 0.99 < 1), highest input impedance (~100-500 kOmega), lowest output impedance (~10-50 Omega).
   * 0° phase shift. Ideal as an impedance-matching buffer driver.`
      },
      {
        heading: '5. Early Effect (Base-Width Modulation)',
        content: `As collector-to-emitter reverse bias V_CE increases, the depletion layer of the reverse-biased CBJ expands into the lightly doped base.
- Effective neutral base width W_B narrows (base-width modulation).
- Narrower base reduces recombination even further, causing I_C to increase slightly with increasing V_CE.
- When output characteristic curves (I_C vs V_CE) are extrapolated backward, they intersect the negative voltage axis at a common point called the Early Voltage (-V_A, typically 50 V to 150 V).
- Small-signal output resistance: r_o = (V_A + V_CE) / I_C ≈ V_A / I_C.`
      }
    ],
    importantDefinitions: [
      { term: 'Bipolar Junction Transistor (BJT)', definition: 'A three-terminal semiconductor device where conduction is mediated by both electrons and holes across two PN junctions.' },
      { term: 'Common-Base Current Gain (alpha)', definition: 'The ratio of collector current to emitter current in the active mode: alpha = I_C / I_E (typically 0.98 to 0.998).' },
      { term: 'Common-Emitter Current Gain (beta or h_FE)', definition: 'The ratio of collector current to base current: beta = I_C / I_B = alpha / (1 - alpha) (typically 50 to 300).' },
      { term: 'Base-Width Modulation (Early Effect)', definition: 'The narrowing of the effective neutral base width as reverse collector-base voltage increases, causing an upward tilt in output characteristics.' },
      { term: 'Early Voltage (V_A)', definition: 'The extrapolated negative voltage intercept on the V_CE axis representing the severity of base-width modulation.' },
      { term: 'Saturation Voltage (V_CE,sat)', definition: 'The small residual collector-emitter voltage when a BJT is fully saturated (~0.2 V for Silicon).' }
    ],
    circuitDiagram: `+--------------------------------------------------------------------------+
|                  NPN BJT INTERNAL CURRENT FLOW (ACTIVE MODE)             |
+--------------------------------------------------------------------------+

           EMITTER (n+)              BASE (p)               COLLECTOR (n)
         Heavily Doped              Thin & Light           Moderately Doped
        +---------------+      +-------------------+      +-----------------+
        |               |      |                   |      |                 |
  <==== |  Electrons    | ===> |  Recombination    | ===> | Collected       | ====> I_C
   I_E  |  Injected     |      |  (1% - 2%)        |      | Electrons       |
        +---------------+      +---------+---------+      +-----------------+
                                         |
                                         V I_B (Tiny base current)

  Biasing in Forward Active:
  - Base-Emitter Junction (EBJ): FORWARD BIASED (V_BE ≈ 0.7 V)
  - Collector-Base Junction (CBJ): REVERSE BIASED (V_CB > 0)
  Currents: I_E = I_B + I_C,  I_C = beta * I_B`,
    stepByStepExamples: [
      {
        title: 'Step-by-Step Analysis: Determining Transistor Operating State',
        steps: [
          'Given: A simple CE circuit with V_CC = 10 V, R_C = 2 kOmega, R_B = 100 kOmega, beta = 100, and input V_in = 5 V.',
          'Step 1: Check EBJ. Since V_in = 5 V > 0.7 V, the base-emitter junction is forward biased (V_BE = 0.7 V). Transistor is NOT in cutoff.',
          'Step 2: Calculate Base Current I_B assuming active mode: I_B = (V_in - V_BE) / R_B = (5 - 0.7) / 100k = 4.3 V / 100 kOmega = 43 micro-Amps.',
          'Step 3: Calculate maximum possible collector current in saturation (assuming V_CE,sat = 0.2 V): I_C,sat = (V_CC - V_CE,sat) / R_C = (10 - 0.2) / 2k = 9.8 V / 2 kOmega = 4.9 mA.',
          'Step 4: Calculate active-mode collector current: I_C,active = beta * I_B = 100 * 43 micro-A = 4.3 mA.',
          'Step 5: Compare I_C,active with I_C,sat: Since 4.3 mA < 4.9 mA, the transistor is in FORWARD ACTIVE MODE!',
          'Step 6: Calculate actual V_CE: V_CE = V_CC - I_C * R_C = 10 V - (4.3 mA * 2 kOmega) = 10 - 8.6 = 1.4 V.'
        ]
      }
    ],
    importantEquations: [
      { equation: 'I_E = I_B + I_C', description: 'Kirchhoff\'s current law for any BJT terminal currents' },
      { equation: 'beta = alpha / (1 - alpha), alpha = beta / (beta + 1)', description: 'Relationship between common-emitter and common-base gains' },
      { equation: 'I_C = beta * I_B + I_CEO', description: 'Collector current in common-emitter configuration' },
      { equation: 'I_CEO = (beta + 1) * I_CBO', description: 'Collector-emitter leakage with base open' },
      { equation: 'r_o = V_A / I_C', description: 'Small-signal output resistance due to Early effect' },
      { equation: 'g_m = I_C / V_T', description: 'Transconductance of BJT at operating point' }
    ],
    numericalProblems: [
      {
        problem: 'An NPN transistor has common-emitter current gain beta = 150 and reverse collector-base leakage I_CBO = 10 nA at 300 K. Calculate: (a) Common-base gain alpha, (b) Collector-emitter leakage current I_CEO, and (c) Collector current I_C and Emitter current I_E when base current is I_B = 20 micro-Amperes.',
        solution: `(a) Common-base current gain alpha:
alpha = beta / (beta + 1) = 150 / (150 + 1) = 150 / 151 = 0.9934.

(b) Collector-emitter leakage current I_CEO:
I_CEO = (beta + 1) * I_CBO = (150 + 1) * 10 nA = 151 * 10 nA = 1.51 micro-Amps.

(c) Collector current I_C:
I_C = beta * I_B + I_CEO = (150 * 20 micro-A) + 1.51 micro-A
I_C = 3000 micro-A + 1.51 micro-A = 3.0015 mA ≈ 3.00 mA.

Emitter current I_E:
I_E = I_B + I_C = 20 micro-A + 3001.5 micro-A = 3021.5 micro-A = 3.022 mA.
Notice: I_C / I_E = 3.0015 / 3.0215 = 0.9934 = alpha (verified!).`
      }
    ],
    applications: [
      'Analog audio preamplifiers and operational amplifier input stages (high voltage gain and low noise).',
      'High-speed digital bipolar switching circuits (e.g. ECL - Emitter Coupled Logic).',
      'Power drive switches for relay actuators, solenoids, and stepper motors.',
      'RF low-noise amplifiers (LNAs) and local oscillators in cellular transceivers.'
    ],
    commonMistakes: [
      'Assuming beta is a universal constant; beta varies by up to 300% across manufacturing batches and drifts significantly with temperature and collector current.',
      'Using I_C = beta * I_B blindly in saturation mode; once saturated, I_C is bounded strictly by external circuit resistors and V_CE,sat.',
      'Confusing the terminals of symmetric-looking BJT packages; swapping collector and emitter results in tiny gain (beta_r < 2) due to lower collector doping.'
    ],
    vivaQuestions: [
      {
        question: 'Why is the base of a BJT made extremely thin and lightly doped?',
        answer: 'The base is made thin (shorter than the minority carrier diffusion length) and lightly doped to minimize the probability of electron-hole recombination in the base region. This ensures that nearly all carriers injected from the emitter (>98-99%) diffuse across the base and reach the collector, maximizing current gain beta and alpha.'
      },
      {
        question: 'Why can two separate discrete PN junction diodes connected back-to-back never function as a BJT?',
        answer: 'In two discrete diodes connected wire-to-wire, the intermediate base region is physically thick (many millimeters) compared to the minority carrier diffusion length. Any injected carriers recombine 100% inside the connecting wire before ever reaching the second junction, completely preventing transistor action.'
      }
    ],
    practiceMCQs: [
      {
        question: 'In a BJT operating in the forward active mode, the two junctions are biased as:',
        options: [
          'EBJ Forward, CBJ Reverse',
          'EBJ Reverse, CBJ Forward',
          'Both Forward Biased',
          'Both Reverse Biased'
        ],
        correctAnswer: 0,
        explanation: 'Forward active mode requires the Emitter-Base Junction (EBJ) to be forward biased for carrier injection and the Collector-Base Junction (CBJ) to be reverse biased for carrier collection.'
      },
      {
        question: 'Which BJT amplifier configuration provides unity voltage gain and high current gain (Emitter Follower)?',
        options: ['Common Emitter (CE)', 'Common Base (CB)', 'Common Collector (CC)', 'Cascode configuration'],
        correctAnswer: 2,
        explanation: 'Common Collector (CC), also known as the Emitter Follower, provides near-unity voltage gain (~1), high current gain (beta + 1), and high input impedance with low output impedance.'
      }
    ],
    quickRevisionNotes: [
      'Structure: Emitter (heavy doping), Base (thin, light doping), Collector (moderate doping, largest area).',
      'Active mode: EBJ Forward (V_BE = 0.7V), CBJ Reverse (V_CB > 0). Amplification mode.',
      'Cutoff: Both reverse (OFF switch, I_C ≈ 0). Saturation: Both forward (ON switch, V_CE,sat ≈ 0.2V).',
      'Current relations: I_E = I_B + I_C; I_C = beta * I_B = alpha * I_E; beta = alpha / (1 - alpha).',
      'CE: High voltage & current gain, 180° phase inversion. CB: Low input Z, high output Z. CC: High input Z, low output Z, A_v ≈ 1.',
      'Early Effect: CBJ depletion widens, base narrows, I_C rises with V_CE. Output resistance: r_o ≈ V_A / I_C.'
    ]
  }
};
