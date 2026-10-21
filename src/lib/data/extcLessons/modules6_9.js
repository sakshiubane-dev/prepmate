/**
 * PrepMate EXTC (Electronics & Telecommunication) Lesson Content
 * Modules 6 to 9: MOSFET, JFET, CMOS, Transistor Biasing
 * Each module contains all 15 comprehensive engineering sections.
 */

export const EXTC_MODULES_6_9 = {
  'mosfet': {
    id: 'mosfet',
    subjectId: 'electronic_devices',
    order: 6,
    title: 'MOSFET',
    estimatedTime: '50 mins',
    learningObjectives: [
      'Contrast Enhancement mode (normally OFF) and Depletion mode (normally ON) in NMOS and PMOS.',
      'Analyze the physical formation of the inversion layer and threshold voltage V_th.',
      'Derive and calculate drain current I_D across Cutoff, Triode (Linear), and Saturation regions.',
      'Interpret transfer (I_D vs V_GS) and output (I_D vs V_DS) characteristic curves.',
      'Formulate channel length modulation parameter lambda, transconductance g_m, and switching behavior.'
    ],
    prerequisites: [
      'Semiconductor Physics: Doping, carrier mobility, energy bands, and electric fields.',
      'MOS capacitor fundamentals (accumulation, depletion, and strong inversion modes).'
    ],
    theoryAndConcepts: [
      {
        heading: '1. MOSFET Structure & Physical Operation',
        content: `The Metal-Oxide-Semiconductor Field-Effect Transistor (MOSFET) is a four-terminal (Gate G, Drain D, Source S, Body/Substrate B) voltage-controlled unipolar device. Conduction is governed purely by majority carriers flowing through a field-induced surface channel:
1. Physical Construction (NMOS on p-type substrate):
   * Substrate: Moderately doped p-type Silicon body (B).
   * Source and Drain: Two heavily doped n+ regions separated by channel length L (e.g. 10 nm to 1 micro-meter).
   * Gate Dielectric: An ultra-thin insulating dielectric layer of Silicon Dioxide (SiO_2, thickness t_ox ~ 1 to 5 nm) or high-k hafnium oxide deposited directly over the channel region.
   * Gate Electrode: Highly conductive polysilicon or metal deposited on top of the gate dielectric.
   * Because the gate oxide is an exceptional insulator, DC gate current is virtually zero (I_G ≈ 0 A), giving MOSFETs an extraordinarily high input resistance (~10^12 to 10^15 Omega).
2. Enhancement Mode vs. Depletion Mode:
   * Enhancement MOSFET (E-MOSFET, Normally OFF): No physical conductive channel exists at zero gate bias (V_GS = 0). A gate voltage greater than threshold V_th must be applied to create (enhance) an inversion channel. Widely used in all digital logic.
   * Depletion MOSFET (D-MOSFET, Normally ON): A physical channel is implanted during fabrication. Current flows at V_GS = 0. A negative gate voltage depletes the channel and pinches it off.`
      },
      {
        heading: '2. Threshold Voltage & Inversion Layer Formation',
        content: `Applying a positive voltage V_GS to the gate of an NMOS device causes three distinct surface states:
1. Accumulation (V_GS < 0): Holes in the p-substrate are attracted to the oxide interface.
2. Depletion (0 < V_GS < V_th): Positive gate charges repel positive holes away from the surface into the substrate, leaving behind an uncovered layer of immobile negative acceptor ions (-q * N_A).
3. Inversion (V_GS >= V_th): When gate voltage reaches the Threshold Voltage (V_th ≈ 0.4 V to 0.8 V for Silicon), the electrostatic surface potential bends the conduction band below the Fermi level. Free electrons are drawn into a narrow (~1-5 nm) sheet at the interface, forming an n-type "inversion layer" bridging Source and Drain.
- Process Transconductance Parameter: k_n\' = mu_n * C_ox, where oxide capacitance per unit area is C_ox = epsilon_ox / t_ox.
- Device Transconductance Parameter: k_n = k_n\' * (W / L) = mu_n * C_ox * (W / L), where W is channel width.`
      },
      {
        heading: '3. The Three Operating Regions for NMOS',
        content: `1. Cutoff Region (V_GS < V_th):
   * No conductive channel connects Source and Drain.
   * Drain Current: I_D ≈ 0 (only tiny subthreshold leakage flows).
   * MOSFET acts as an OPEN switch.
2. Triode / Linear / Ohmic Region (V_GS >= V_th and V_DS < V_GS - V_th):
   * Continuous inverted channel exists from Source all the way to Drain.
   * Drain current equation:
     I_D = mu_n * C_ox * (W / L) * [(V_GS - V_th) * V_DS - 0.5 * V_DS^2]
   * For very small V_DS << (V_GS - V_th), the V_DS^2 term vanishes:
     I_D ≈ k_n * (V_GS - V_th) * V_DS
   * Channel behaves as a linear voltage-controlled resistor with resistance:
     r_DS = 1 / [k_n * (V_GS - V_th)].
3. Saturation / Pinch-Off Region (V_GS >= V_th and V_DS >= V_GS - V_th):
   * The effective gate-to-channel voltage at the drain end drops to (V_GD = V_GS - V_DS = V_th).
   * The inversion channel pinches off at the drain end!
   * Any further increase in V_DS drops across the pinch-off depletion gap; electrons are accelerated across by the electric field, keeping current constant:
     I_D = 0.5 * mu_n * C_ox * (W / L) * (V_GS - V_th)^2
   * Notice I_D is independent of V_DS (square-law dependence on V_GS). MOSFET behaves as an ideal voltage-controlled current source (VCCS).`
      },
      {
        heading: '4. Channel Length Modulation & Transconductance',
        content: `1. Channel Length Modulation (Early Effect in MOSFETs):
   * As V_DS increases far beyond saturation (V_DS > V_DS,sat), the pinch-off point moves slightly toward the source, reducing effective channel length L_eff = L - Delta L.
   * Incorporating channel length modulation parameter lambda (typically 0.005 to 0.05 V^-1):
     I_D = 0.5 * k_n * (V_GS - V_th)^2 * (1 + lambda * V_DS)
   * Finite output resistance in saturation: r_o = Delta V_DS / Delta I_D ≈ 1 / (lambda * I_D) = V_A / I_D.
2. Small-Signal Transconductance g_m:
   * Rate of change of drain current with respect to gate-source voltage:
     g_m = partial I_D / partial V_GS = k_n * (V_GS - V_th) = sqrt(2 * k_n * I_D) = 2 * I_D / (V_GS - V_th) (in saturation).`
      }
    ],
    importantDefinitions: [
      { term: 'Threshold Voltage (V_th)', definition: 'The minimum gate-to-source voltage required to induce a conductive inversion channel bridging source and drain.' },
      { term: 'Inversion Layer', definition: 'A thin sheet of mobile minority carriers formed at the semiconductor-oxide interface when the surface potential is inverted.' },
      { term: 'Oxide Capacitance (C_ox)', definition: 'The gate capacitance per unit area: C_ox = epsilon_ox / t_ox (in F/cm^2).' },
      { term: 'Pinch-Off', definition: 'The narrowing and vanishing of the inversion layer at the drain end when V_DS reaches V_GS - V_th.' },
      { term: 'Channel Length Modulation (lambda)', definition: 'The shortening of the effective channel length as V_DS increases in saturation, giving the output characteristic a non-zero slope.' },
      { term: 'Body Effect (Substrate Bias Effect)', definition: 'The increase in threshold voltage V_th when a reverse bias V_SB is applied between source and substrate body.' }
    ],
    circuitDiagram: `+--------------------------------------------------------------------------+
|                  N-CHANNEL ENHANCEMENT MOSFET CROSS-SECTION              |
+--------------------------------------------------------------------------+

               Gate Terminal (G)
                      |
              +---------------+  Metal / Polysilicon Gate
              |  Gate Oxide   |  SiO2 Dielectric (t_ox ~ 2nm)
       +------+---------------+------+
       |   n+                 n+     |
  Source (S)    Inversion Channel   Drain (D)
  [========]   ..................  [=========]
  |                                          |
  |         p-type Silicon Substrate         |
  +------------------------------------------+
                      |
               Body Terminal (B)

  Three Operating Regions:
  1) Cutoff:     V_GS < V_th                  => I_D = 0
  2) Triode:     V_GS >= V_th, V_DS < V_ov    => I_D = kn * [V_ov*V_DS - 0.5*V_DS^2]
  3) Saturation: V_GS >= V_th, V_DS >= V_ov   => I_D = 0.5 * kn * (V_ov)^2
                 where Overdrive Voltage V_ov = V_GS - V_th`,
    stepByStepExamples: [
      {
        title: 'Step-by-Step Operating Region Identification',
        steps: [
          'Given: NMOS with V_th = 0.8 V, k_n = 1.0 mA/V^2, V_GS = 2.0 V, V_DS = 3.0 V.',
          'Step 1: Check gate bias against threshold: Overdrive V_ov = V_GS - V_th = 2.0 - 0.8 = 1.2 V.',
          'Since V_GS = 2.0 V > V_th = 0.8 V, the device is ON (not in cutoff).',
          'Step 2: Compare V_DS with overdrive voltage V_ov: V_ov = 1.2 V, V_DS = 3.0 V.',
          'Step 3: Evaluate condition: V_DS (3.0 V) >= V_ov (1.2 V).',
          'Conclusion: The MOSFET is in the SATURATION (Pinch-off) REGION.',
          'Step 4: Compute drain current: I_D = 0.5 * k_n * (V_GS - V_th)^2 = 0.5 * (1.0 mA/V^2) * (1.2 V)^2 = 0.5 * 1.44 = 0.72 mA.'
        ]
      }
    ],
    importantEquations: [
      { equation: 'I_D (Triode) = mu_n * C_ox * (W/L) * [(V_GS - V_th)*V_DS - 0.5*V_DS^2]', description: 'Drain current in triode/linear region' },
      { equation: 'I_D (Saturation) = 0.5 * mu_n * C_ox * (W/L) * (V_GS - V_th)^2 * (1 + lambda*V_DS)', description: 'Drain current in saturation with channel length modulation' },
      { equation: 'V_DS,sat = V_GS - V_th = V_ov', description: 'Saturation voltage (overdrive voltage)' },
      { equation: 'g_m = mu_n * C_ox * (W/L) * (V_GS - V_th) = sqrt(2 * k_n * I_D)', description: 'MOSFET transconductance in saturation' },
      { equation: 'r_o = 1 / (lambda * I_D) = V_A / I_D', description: 'Small-signal output resistance in saturation' }
    ],
    numericalProblems: [
      {
        problem: 'An NMOS transistor has parameters V_th = 0.7 V, mu_n * C_ox = 200 micro-A/V^2, W/L = 20, and channel length modulation parameter lambda = 0.02 V^-1. (a) Calculate drain current I_D when V_GS = 1.5 V and V_DS = 2.5 V. (b) Find the small-signal transconductance g_m and output resistance r_o at this operating point.',
        solution: `(a) Transconductance parameter:
k_n = (mu_n * C_ox) * (W/L) = (200 x 10^-6 A/V^2) * 20 = 4.0 x 10^-3 A/V^2 = 4.0 mA/V^2.

Check operating region:
Overdrive voltage V_ov = V_GS - V_th = 1.5 V - 0.7 V = 0.8 V.
Since V_DS = 2.5 V > V_ov = 0.8 V, the device is in SATURATION.

Calculate I_D with channel length modulation:
I_D = 0.5 * k_n * (V_GS - V_th)^2 * (1 + lambda * V_DS)
I_D = 0.5 * (4.0 mA/V^2) * (0.8 V)^2 * (1 + 0.02 * 2.5)
I_D = 2.0 * 0.64 * (1 + 0.05) = 1.28 * 1.05 = 1.344 mA.

(b) Small-signal parameters:
1. Transconductance g_m:
g_m = k_n * (V_GS - V_th) * (1 + lambda * V_DS) ≈ k_n * (V_GS - V_th)
g_m = (4.0 mA/V^2) * 0.8 V = 3.2 mA/V = 3.2 mS.

2. Output resistance r_o:
r_o = 1 / (lambda * I_D) = 1 / (0.02 V^-1 * 1.344 x 10^-3 A) = 1 / (2.688 x 10^-5) = 37.2 kOmega.`
      }
    ],
    applications: [
      'Core switching elements in billions of transistors inside modern CPU, GPU, and memory ICs.',
      'Power MOSFETs (HEXFET, TrenchMOS) in brushless motor inverters, electric vehicles, and DC-DC converters.',
      'CMOS analog amplifiers, active loads, and current mirrors in operational amplifiers.',
      'High-speed analog multiplexers and sample-and-hold circuits in data acquisition systems.'
    ],
    commonMistakes: [
      'Confusing the operating regions of BJT and MOSFET; BJT "active" corresponds to MOSFET "saturation", while BJT "saturation" corresponds to MOSFET "triode".',
      'Neglecting the body effect; connecting substrate B to a voltage lower than source S increases V_th, unexpectedly reducing drive current.',
      'Assuming drain current drops to zero the instant pinch-off occurs; pinch-off merely saturates the current to a constant value, it does not choke it off.'
    ],
    vivaQuestions: [
      {
        question: 'Why are MOSFETs called unipolar devices while BJTs are bipolar?',
        answer: 'MOSFETs are unipolar devices because current conduction through the channel involves only one polarity of charge carriers (electrons in NMOS, or holes in PMOS). In contrast, BJTs are bipolar because their operation requires the simultaneous transport of both majority and minority carriers (electrons and holes across base and collector).'
      },
      {
        question: 'What is the significance of the W/L ratio in integrated circuit design?',
        answer: 'The aspect ratio (Width/Length = W/L) is the primary geometric parameter designers adjust to tune device performance. Increasing W/L proportionally increases drive current I_D and transconductance g_m (faster charging of capacitive loads) at the expense of silicon area and gate capacitance.'
      }
    ],
    practiceMCQs: [
      {
        question: 'For an n-channel enhancement MOSFET with V_th = 1 V, if V_GS = 3 V and V_DS = 1 V, the operating region is:',
        options: ['Cutoff region', 'Triode (linear) region', 'Saturation region', 'Breakdown region'],
        correctAnswer: 1,
        explanation: 'Overdrive voltage V_ov = V_GS - V_th = 3 - 1 = 2 V. Since V_DS = 1 V < V_ov = 2 V, the channel is continuous from source to drain, placing the device in the Triode (linear) region.'
      },
      {
        question: 'The gate input impedance of an ideal MOSFET is practically infinite because:',
        options: [
          'The channel is heavily doped',
          'The gate is insulated by a dielectric SiO2 layer',
          'The drain-source path is pinched off',
          'The body is reverse-biased'
        ],
        correctAnswer: 1,
        explanation: 'The physical gate electrode is separated from the semiconductor substrate by an insulating dielectric oxide (SiO_2), preventing DC conduction current from flowing into the gate.'
      }
    ],
    quickRevisionNotes: [
      'MOSFET: Voltage-controlled unipolar device (I_G ≈ 0, input impedance > 10^12 Omega).',
      'Enhancement: Normally OFF (needs V_GS > V_th). Depletion: Normally ON (channel exists at V_GS = 0).',
      'Cutoff (V_GS < V_th): I_D = 0.',
      'Triode (V_DS < V_GS - V_th): I_D = k_n * [(V_GS - V_th)*V_DS - 0.5*V_DS^2].',
      'Saturation (V_DS >= V_GS - V_th): I_D = 0.5 * k_n * (V_GS - V_th)^2 * (1 + lambda*V_DS).',
      'Transconductance: g_m = k_n * (V_GS - V_th) = sqrt(2 * k_n * I_D).'
    ]
  },

  'jfet': {
    id: 'jfet',
    subjectId: 'electronic_devices',
    order: 7,
    title: 'JFET',
    estimatedTime: '40 mins',
    learningObjectives: [
      'Examine the physical construction and working principle of N-channel and P-channel JFETs.',
      'Analyze the pinch-off voltage V_P and channel depletion width modulation.',
      'Apply Shockley\'s drain current equation: I_D = I_DSS * (1 - V_GS / V_P)^2 in the saturation region.',
      'Extract JFET parameters: dynamic resistance r_d, transconductance g_m, and amplification factor mu.',
      'Critically compare JFET, MOSFET, and BJT in terms of input impedance, noise, and ESD ruggedness.'
    ],
    prerequisites: [
      'PN junction reverse bias depletion region mechanics.',
      'Ohm\'s Law, drift mobility, and channel resistance.'
    ],
    theoryAndConcepts: [
      {
        heading: '1. JFET Construction & Principle of Operation',
        content: `A Junction Field-Effect Transistor (JFET) is a three-terminal (Drain D, Source S, Gate G), unipolar, normally-ON semiconductor device:
1. Physical Construction (N-channel JFET):
   * Consists of an n-type semiconductor silicon bar with ohmic contacts at both ends: Drain (D) and Source (S).
   * Two heavily doped p+ regions are diffused into opposite sides of the n-channel bar, forming two reverse-biased PN junctions.
   * Both p+ gates are internally connected together to form a single external Gate terminal (G).
2. Working Principle:
   * When a drain-source voltage V_DS is applied with Gate grounded (V_GS = 0), electrons flow from Source to Drain through the channel.
   * The current produces an internal IR voltage drop along the channel, making points near the drain more positive than points near the source.
   * Consequently, the reverse bias across the p+n gate-channel junctions is greatest near the drain end!
   * The depletion regions penetrate deepest into the lightly doped n-channel near the drain, tapering the channel into a wedge shape.
   * Applying an external negative gate voltage (V_GS < 0) further widens both depletion regions from both sides, choking the channel and reducing drain current I_D.`
      },
      {
        heading: '2. Pinch-Off Voltage V_P & Drain Characteristics',
        content: `The output characteristics (I_D vs V_DS for different V_GS) exhibit three distinct regions:
1. Ohmic / Linear Region (Small V_DS):
   * For V_DS < V_DS,sat, the channel acts as an ordinary ohmic resistor whose value is modulated by gate voltage V_GS.
2. Pinch-Off Voltage V_P (or V_GS,off):
   * The specific reverse gate-source voltage at which the two opposing depletion regions touch and completely pinch off the channel:
     For N-channel JFET: V_P is negative (e.g. -4 V).
     For P-channel JFET: V_P is positive (e.g. +4 V).
3. Saturation / Pinch-Off / Active Region (V_DS >= V_DS,sat = V_GS - V_P):
   * When V_DS reaches V_GS - V_P, the depletion regions meet at the drain end.
   * Any further increase in V_DS is absorbed by the pinch-off space-charge region, keeping the drain current strictly CONSTANT at a saturated value!
4. Breakdown Region:
   * At very high V_DS, avalanche breakdown occurs at the reverse-biased gate-drain junction, causing I_D to spike uncontrollably.`
      },
      {
        heading: '3. Shockley\'s Equation & Transfer Characteristics',
        content: `In the saturation region, JFET drain current is governed by Shockley\'s Equation:
I_D = I_DSS * [1 - (V_GS / V_P)]^2
where:
- I_DSS: Maximum drain saturation current when Gate is shorted to Source (V_GS = 0 V).
- V_P: Pinch-off threshold voltage (negative for n-channel).
- V_GS: Applied gate-to-source reverse bias (must stay between V_P and 0 V).
- If V_GS = 0: I_D = I_DSS.
- If V_GS = V_P: I_D = 0 (cutoff).
- If V_GS = 0.5 * V_P: I_D = I_DSS * (1 - 0.5)^2 = 0.25 * I_DSS.`
      },
      {
        heading: '4. Key Small-Signal JFET Parameters',
        content: `Three primary interrelated AC parameters define JFET performance:
1. Transconductance (Mutual Conductance) g_m:
   * Rate of change of drain current with gate voltage at constant V_DS:
     g_m = partial I_D / partial V_GS = g_m0 * [1 - (V_GS / V_P)]
     where g_m0 = - (2 * I_DSS) / V_P is the maximum transconductance at V_GS = 0.
2. Dynamic Drain Resistance r_d:
   * The AC resistance of the channel in saturation:
     r_d = Delta V_DS / Delta I_D (at constant V_GS, typically 50 kOmega to 500 kOmega).
3. Amplification Factor mu:
   * Measure of voltage control effectiveness:
     mu = Delta V_DS / Delta V_GS (at constant I_D).
   * Fundamental parameter relation: mu = g_m * r_d.`
      }
    ],
    importantDefinitions: [
      { term: 'Junction Field-Effect Transistor (JFET)', definition: 'A three-terminal unipolar semiconductor device in which current conduction through a channel is controlled by reverse-biased PN junctions.' },
      { term: 'I_DSS (Short-Circuit Drain Current)', definition: 'The maximum drain saturation current flowing through a JFET when the gate-source voltage is zero (V_GS = 0 V).' },
      { term: 'Pinch-Off Voltage (V_P)', definition: 'The reverse gate-source voltage that expands the gate depletion regions until they touch, cutting off channel conduction.' },
      { term: 'Transconductance (g_m)', definition: 'The change in drain current per unit change in gate-to-source voltage at constant V_DS (g_m = Delta I_D / Delta V_GS).' },
      { term: 'Amplification Factor (mu)', definition: 'The product of transconductance and dynamic drain resistance (mu = g_m * r_d), representing open-circuit voltage gain.' }
    ],
    circuitDiagram: `+--------------------------------------------------------------------------+
|                  N-CHANNEL JFET PHYSICAL CROSS-SECTION                   |
+--------------------------------------------------------------------------+

               Gate Terminal (G)
                      |
           +----------+----------+
           |                     |
        +--+--+               +--+--+
        | p+  | Gate          | p+  | Gate
        +--+--+ Region        +--+--+ Region
        |  \\\\  Depletion      //  |
        |   \\\\ Region        //   |
  Source (S) \\\\   Channel   //    Drain (D)
  [========]  +-------------+     [=========]
  |               n-channel                 |
  +-----------------------------------------+

  Biasing (N-channel):
  - V_DS > 0 (Drain positive with respect to Source)
  - V_GS <= 0 (Gate ALWAYS reverse-biased: V_GS is negative)
  Shockley's Law: I_D = I_DSS * (1 - V_GS / V_P)^2`,
    stepByStepExamples: [
      {
        title: 'Step-by-Step JFET Parameter Calculation',
        steps: [
          'Given: An n-channel JFET with I_DSS = 12 mA and V_P = -4 V.',
          'Step 1: Calculate maximum transconductance g_m0 at V_GS = 0: g_m0 = - (2 * I_DSS) / V_P = - (2 * 12 mA) / (-4 V) = 24 / 4 = 6.0 mA/V = 6.0 mS.',
          'Step 2: Operating point at V_GS = -1.5 V: Check that V_P <= V_GS <= 0 (-4 V <= -1.5 V <= 0, valid!).',
          'Step 3: Calculate drain current I_D using Shockley\'s equation: I_D = I_DSS * [1 - (V_GS / V_P)]^2 = 12 mA * [1 - (-1.5 / -4)]^2 = 12 * (1 - 0.375)^2 = 12 * (0.625)^2 = 12 * 0.3906 = 4.69 mA.',
          'Step 4: Calculate transconductance g_m at V_GS = -1.5 V: g_m = g_m0 * [1 - (V_GS / V_P)] = 6.0 mS * (1 - 0.375) = 6.0 * 0.625 = 3.75 mS.',
          'Step 5: If dynamic resistance is r_d = 40 kOmega, find amplification factor: mu = g_m * r_d = (3.75 x 10^-3 S) * (40 x 10^3 Omega) = 150.'
        ]
      }
    ],
    importantEquations: [
      { equation: 'I_D = I_DSS * [1 - (V_GS / V_P)]^2', description: 'Shockley\'s equation for JFET drain current in saturation' },
      { equation: 'V_DS,sat = V_GS - V_P', description: 'Drain-source voltage at the onset of pinch-off' },
      { equation: 'g_m0 = - (2 * I_DSS) / V_P', description: 'Maximum transconductance at V_GS = 0' },
      { equation: 'g_m = g_m0 * [1 - (V_GS / V_P)]', description: 'Transconductance at an arbitrary bias point V_GS' },
      { equation: 'mu = g_m * r_d', description: 'Amplification factor relationship' }
    ],
    numericalProblems: [
      {
        problem: 'An N-channel JFET has I_DSS = 10 mA and V_P = -5 V. (a) Determine the drain current I_D for V_GS = 0 V, -1 V, -2.5 V, and -5 V. (b) If the JFET is used as an amplifier biased at V_GS = -2 V with a dynamic drain resistance r_d = 50 kOmega, find g_m and amplification factor mu.',
        solution: `(a) Using Shockley's equation I_D = I_DSS * [1 - (V_GS / V_P)]^2:
1. For V_GS = 0 V:
   I_D = 10 mA * [1 - 0]^2 = 10.0 mA (= I_DSS).
2. For V_GS = -1 V:
   I_D = 10 mA * [1 - (-1 / -5)]^2 = 10 * (1 - 0.2)^2 = 10 * (0.8)^2 = 6.4 mA.
3. For V_GS = -2.5 V:
   I_D = 10 mA * [1 - (-2.5 / -5)]^2 = 10 * (1 - 0.5)^2 = 10 * 0.25 = 2.5 mA.
4. For V_GS = -5 V (= V_P):
   I_D = 10 mA * [1 - 1]^2 = 0 mA (cutoff).

(b) At V_GS = -2 V:
Maximum transconductance g_m0:
g_m0 = - (2 * I_DSS) / V_P = - (2 * 10 mA) / (-5 V) = 20 / 5 = 4.0 mS.
Transconductance at V_GS = -2 V:
g_m = g_m0 * [1 - (V_GS / V_P)] = 4.0 mS * [1 - (-2 / -5)] = 4.0 * (1 - 0.4) = 2.4 mS.
Amplification factor mu:
mu = g_m * r_d = (2.4 x 10^-3 S) * (50 x 10^3 Omega) = 120.`
      }
    ],
    applications: [
      'Ultra-low-noise front-end preamplifiers for sensitive audio microphones and acoustic sensors.',
      'High-impedance input stages in multimeters and electrometer measurement probes (input resistance ~10^8 to 10^10 Omega).',
      'Voltage-Controlled Resistors (VCRs) in automatic gain control (AGC) and audio volume compressors.',
      'Constant-current diodes / sources (formed by tying Gate to Source: V_GS = 0 => I = I_DSS).'
    ],
    commonMistakes: [
      'Forward-biasing the gate junction (e.g. applying positive V_GS to an N-channel JFET); this causes massive gate conduction current, destroying the JFET.',
      'Confusing JFET pinch-off voltage V_P (which turns the channel OFF) with MOSFET threshold voltage V_th (which turns the channel ON).',
      'Forgetting that JFET is inherently a depletion-mode (normally ON) device; current flows freely at V_GS = 0.'
    ],
    vivaQuestions: [
      {
        question: 'Why does a JFET exhibit significantly lower noise than a BJT in audio amplification?',
        answer: 'BJTs rely on minority carrier injection and recombination across two PN junctions, generating significant shot noise and partition noise. JFETs are majority carrier bulk conduction devices where carriers travel through an unobstructed semiconductor channel with no junction crossing, resulting in virtually zero shot noise and superior low-frequency signal-to-noise ratio.'
      },
      {
        question: 'Why is a JFET far more rugged against electrostatic discharge (ESD) than a MOSFET?',
        answer: 'A MOSFET has an extremely thin, delicate gate oxide (SiO_2, ~2 nm) that ruptures permanently under static charges of a few tens of volts. A JFET gate consists of a PN junction with a relatively large junction capacitance and breakdown voltage that can safely dissipate small static discharges without dielectric punch-through.'
      }
    ],
    practiceMCQs: [
      {
        question: 'For an n-channel JFET, if V_GS becomes more negative, the conductive channel width will:',
        options: ['Increase', 'Decrease', 'Remain unchanged', 'Double'],
        correctAnswer: 1,
        explanation: 'Increasing the negative gate voltage increases reverse bias on the gate-channel PN junctions, widening the depletion regions and constricting (decreasing) the conductive channel width.'
      },
      {
        question: 'When a JFET is biased such that V_GS = 0 V and V_DS >= |V_P|, the drain current is equal to:',
        options: ['0 mA', 'I_DSS / 2', 'I_DSS', 'Infinity'],
        correctAnswer: 2,
        explanation: 'At V_GS = 0 in the saturation region, drain current reaches its maximum saturated value designated as I_DSS.'
      }
    ],
    quickRevisionNotes: [
      'JFET: Normally-ON, unipolar, voltage-controlled device with high input impedance (~10^9 Omega).',
      'Gate MUST be reverse-biased (N-channel: V_GS <= 0, P-channel: V_GS >= 0).',
      'Pinch-off voltage V_P: The reverse voltage where depletion regions meet and choke the channel.',
      'Shockley\'s equation (saturation): I_D = I_DSS * [1 - (V_GS/V_P)]^2.',
      'Parameters: g_m0 = -2*I_DSS / V_P, g_m = g_m0 * (1 - V_GS/V_P), mu = g_m * r_d.',
      'Comparison: JFET has lower noise and higher ESD tolerance than MOSFET, but lower input impedance than MOSFET.'
    ]
  },

  'cmos': {
    id: 'cmos',
    subjectId: 'electronic_devices',
    order: 8,
    title: 'CMOS',
    estimatedTime: '45 mins',
    learningObjectives: [
      'Analyze the complementary operation of NMOS pull-down and PMOS pull-up networks.',
      'Trace the Voltage Transfer Characteristics (VTC) of a CMOS inverter across all 5 operating regions.',
      'Calculate high and low Noise Margins (NM_H and NM_L) and inverter switching threshold V_M.',
      'Differentiate Static Leakage Power and Dynamic Switching Power dissipation (P_dyn = C_L * V_DD^2 * f).',
      'Construct complex CMOS complementary logic gates (NAND, NOR, XOR) using Euler path optimization.'
    ],
    prerequisites: [
      'MOSFET operating regions (Cutoff, Triode, Saturation) for both NMOS and PMOS.',
      'Basic Boolean algebra and digital logic truth tables.'
    ],
    theoryAndConcepts: [
      {
        heading: '1. CMOS Inverter Architecture & Complementary Action',
        content: `Complementary Metal-Oxide-Semiconductor (CMOS) technology pairs n-channel (NMOS) and p-channel (PMOS) transistors to construct digital logic with near-zero static power consumption:
1. Circuit Topology:
   * PMOS Pull-Up Network (PUN): Connected between power supply V_DD and output node V_out. The substrate is tied to V_DD.
   * NMOS Pull-Down Network (PDN): Connected between output node V_out and ground (GND = 0 V). The substrate is tied to GND.
   * Input V_in connects simultaneously to the gates of both transistors.
   * Drains of both transistors are tied together to form output V_out.
2. Complementary Switching Logic:
   * Input V_in = Low (0 V):
     - NMOS Gate-to-Source: V_GS,n = 0 V < V_th,n => NMOS is completely OFF (Cutoff).
     - PMOS Gate-to-Source: V_GS,p = 0 - V_DD = -V_DD < V_th,p => PMOS is fully ON (Triode).
     - Result: Output V_out pulls up completely to V_DD (Logic 1: V_OH = V_DD).
   * Input V_in = High (V_DD):
     - NMOS Gate-to-Source: V_GS,n = V_DD > V_th,n => NMOS is fully ON (Triode).
     - PMOS Gate-to-Source: V_GS,p = V_DD - V_DD = 0 V > V_th,p => PMOS is completely OFF (Cutoff).
     - Result: Output V_out pulls down completely to GND (Logic 0: V_OL = 0 V).
- Crucial Takeaway: In both steady states (Logic 0 and Logic 1), one transistor is completely OFF! Therefore, no continuous DC path exists from V_DD to GND, reducing static power dissipation to virtually zero (nano-watts)!`
      },
      {
        heading: '2. Voltage Transfer Characteristic (VTC) & 5 Regions',
        content: `Plotting V_out versus V_in reveals five distinct operating regions:
- Region A (V_in < V_th,n): NMOS Cutoff, PMOS Triode => V_out = V_OH = V_DD.
- Region B (V_th,n <= V_in < V_M): NMOS Saturation, PMOS Triode => V_out drops gradually.
- Region C (V_in = V_M, Switching Threshold): Both NMOS and PMOS are in SATURATION!
  * Extremely steep transition slope (high voltage gain A_v = dV_out/dV_in < -20).
  * For a symmetric inverter (k_n = k_p and V_th,n = |V_th,p|):
    V_M = V_DD / 2.
  * Because electron mobility mu_n is 2.5x to 3x hole mobility mu_p in Silicon, matching k_n = k_p requires widening the PMOS:
    (W/L)_p ≈ (2.5 to 3.0) * (W/L)_n!
- Region D (V_M < V_in <= V_DD - |V_th,p|): NMOS Triode, PMOS Saturation => V_out drops rapidly.
- Region E (V_in > V_DD - |V_th,p|): NMOS Triode, PMOS Cutoff => V_out = V_OL = 0 V.`
      },
      {
        heading: '3. Noise Margins (NM_H & NM_L)',
        content: `Noise margins quantify the immunity of a digital circuit against spurious electrical noise on signal interconnects:
- V_IL: Maximum input voltage recognized as valid Logic 0 (defined where slope dV_out/dV_in = -1 in Region B).
- V_IH: Minimum input voltage recognized as valid Logic 1 (defined where slope dV_out/dV_in = -1 in Region D).
- V_OL: Maximum output voltage for Logic 0 (typically 0 V).
- V_OH: Minimum output voltage for Logic 1 (typically V_DD).
- Low Noise Margin: NM_L = V_IL - V_OL = V_IL - 0 = V_IL.
- High Noise Margin: NM_H = V_OH - V_IH = V_DD - V_IH.
- Symmetrical CMOS inverters achieve wide noise margins (~0.45 * V_DD), providing exceptional noise rejection.`
      },
      {
        heading: '4. Dynamic Switching Power & Propagation Delay',
        content: `1. Dynamic Power Dissipation:
   * Occurs during logic switching when charging and discharging load capacitance C_L (gate capacitance of downstream gates + interconnect routing):
     P_dyn = C_L * V_DD^2 * f
     where f is switching clock frequency.
   * Direct Short-Circuit Power: Tiny current spike flowing directly from V_DD to GND during the brief transition in Region C when both transistors conduct simultaneously.
2. Total Power: P_total = P_dyn + P_sc + P_static (where P_static = I_leakage * V_DD).
3. Propagation Delay:
   * t_pHL: Delay from 50% input rise to 50% output fall (governed by NMOS discharge).
   * t_pLH: Delay from 50% input fall to 50% output rise (governed by PMOS charge).
   * Average propagation delay: t_p = (t_pHL + t_pLH) / 2.`
      },
      {
        heading: '5. CMOS Logic Gates: NAND and NOR',
        content: `CMOS logic follows dual complementary network rules:
- Duality Principle: Parallel connection in PUN corresponds to Series connection in PDN, and vice versa!
1. CMOS 2-Input NAND Gate:
   * Output Y = NOT(A AND B) = A' + B' (De Morgan\'s Law).
   * PDN (NMOS): Two NMOS in SERIES between output and GND (conducts only when both A=1 and B=1).
   * PUN (PMOS): Two PMOS in PARALLEL between V_DD and output (conducts if either A=0 or B=0).
2. CMOS 2-Input NOR Gate:
   * Output Y = NOT(A OR B) = A' * B'.
   * PDN (NMOS): Two NMOS in PARALLEL between output and GND.
   * PUN (PMOS): Two PMOS in SERIES between V_DD and output.
- NAND is preferred over NOR in silicon because its series transistors are NMOS (faster electrons), whereas NOR requires series PMOS (slower holes), demanding huge silicon area to match speed.`
      }
    ],
    importantDefinitions: [
      { term: 'CMOS (Complementary MOS)', definition: 'A circuit topology combining complementary pairs of p-type and n-type MOSFETs for high-speed, ultra-low static power logic.' },
      { term: 'Pull-Up Network (PUN)', definition: 'The subnet of PMOS transistors that connects the logic output to the positive supply V_DD when active.' },
      { term: 'Pull-Down Network (PDN)', definition: 'The subnet of NMOS transistors that discharges the logic output to ground (0 V) when active.' },
      { term: 'Inverter Switching Threshold (V_M)', definition: 'The input voltage on the VTC where V_in = V_out, typically designed at V_DD / 2.' },
      { term: 'Noise Margin High (NM_H)', definition: 'The maximum tolerable noise voltage on a logic-high input: NM_H = V_OH - V_IH.' },
      { term: 'Noise Margin Low (NM_L)', definition: 'The maximum tolerable noise voltage on a logic-low input: NM_L = V_IL - V_OL.' },
      { term: 'Dynamic Power (P_dyn)', definition: 'Power consumed during digital clock switching to charge and discharge parasitic load capacitances: P_dyn = C_L * V_DD^2 * f.' }
    ],
    circuitDiagram: `+--------------------------------------------------------------------------+
|                  CMOS INVERTER & 2-INPUT NAND SCHEMATIC                  |
+--------------------------------------------------------------------------+

        CMOS INVERTER (NOT Gate)              CMOS 2-INPUT NAND GATE
                 V_DD                                  V_DD
                  |                                     |
              +---+---+                             +---+---+
              |       |                             |       |
              | PMOS  |                         +---+---+ +---+---+
      V_in o--+       +--o V_out                | PMOS  | | PMOS  |
              |       |                     A o-+   A   | |   B   +-o B
              +---+---+                         +---+---+ +---+---+
                  |                                 |       |
                  +                                 +---+---+
                  |                                     |
              +---+---+                                 +--o Output Y = (A.B)'
              |       |                                 |
              | NMOS  |                             +---+---+
      V_in o--+       +--o                          | NMOS  |
              |       |                         A o-+   A   |
              +---+---+                             +---+---+
                  |                                     |
                 GND                                +---+---+
                                                    | NMOS  |
                                                B o-+   B   |
                                                    +---+---+
                                                        |
                                                       GND`,
    stepByStepExamples: [
      {
        title: 'Step-by-Step CMOS Sizing for Equal Symmetrical Delays',
        steps: [
          'Given: Electron mobility mu_n = 500 cm^2/(V*s), hole mobility mu_p = 200 cm^2/(V*s).',
          'Step 1: Calculate mobility ratio: r = mu_n / mu_p = 500 / 200 = 2.5.',
          'Step 2: Equivalent on-resistance of NMOS: R_n proportional to 1 / (mu_n * (W/L)_n).',
          'Step 3: Equivalent on-resistance of PMOS: R_p proportional to 1 / (mu_p * (W/L)_p).',
          'Step 4: For equal rise and fall times (t_pLH = t_pHL), set R_p = R_n.',
          'Step 5: Equating resistances: 1 / [mu_p * (W/L)_p] = 1 / [mu_n * (W/L)_n] => (W/L)_p = (mu_n / mu_p) * (W/L)_n = 2.5 * (W/L)_n.',
          'Conclusion: To achieve symmetric switching and center V_M at V_DD/2, the PMOS transistor channel width must be sized 2.5 times wider than the NMOS transistor.'
        ]
      }
    ],
    importantEquations: [
      { equation: 'P_dyn = C_L * V_DD^2 * f', description: 'Dynamic switching power dissipation' },
      { equation: 'NM_L = V_IL - V_OL, NM_H = V_OH - V_IH', description: 'Low and High noise margins' },
      { equation: 'V_M = [V_th,n + sqrt(k_p/k_n) * (V_DD - |V_th,p|)] / [1 + sqrt(k_p/k_n)]', description: 'Inverter midpoint switching threshold' },
      { equation: 't_p = (t_pHL + t_pLH) / 2', description: 'Average gate propagation delay' },
      { equation: 'P_total = C_L * V_DD^2 * f + I_sc * V_DD + I_leak * V_DD', description: 'Total CMOS power consumption' }
    ],
    numericalProblems: [
      {
        problem: 'A CMOS microprocessor operates at a clock frequency of f = 3.0 GHz with a supply voltage of V_DD = 1.0 V. The total equivalent switched load capacitance is C_L = 1.5 nF. If static leakage current across all gates is I_leak = 100 mA: (a) Calculate dynamic power dissipation P_dyn, (b) Calculate static power dissipation P_stat, and (c) If V_DD is reduced by 20% to 0.8 V while maintaining the same frequency, compute the new dynamic power and percentage power savings.',
        solution: `(a) Dynamic power dissipation:
P_dyn = C_L * V_DD^2 * f
P_dyn = (1.5 x 10^-9 F) * (1.0 V)^2 * (3.0 x 10^9 s^-1)
P_dyn = 1.5 * 1.0 * 3.0 = 4.5 Watts.

(b) Static leakage power:
P_stat = I_leak * V_DD = (100 x 10^-3 A) * (1.0 V) = 0.1 Watts (100 mW).
Total Power at 1.0 V = 4.5 + 0.1 = 4.6 Watts.

(c) When V_DD is scaled down to 0.8 V:
New Dynamic Power:
P_dyn,new = C_L * (V_DD,new)^2 * f
P_dyn,new = (1.5 x 10^-9 F) * (0.8 V)^2 * (3.0 x 10^9 s^-1)
P_dyn,new = 1.5 * 0.64 * 3.0 = 2.88 Watts.

Percentage Power Reduction:
% Reduction = [(4.5 - 2.88) / 4.5] * 100% = (1.62 / 4.5) * 100% = 36% savings!
Notice: A 20% reduction in supply voltage yields a 36% reduction in dynamic power (due to V_DD^2 dependence!).`
      }
    ],
    applications: [
      'Microprocessors, DSPs, ASICs, and FPGAs across Intel, AMD, Apple M-series, and ARM architectures.',
      'SRAM memory cache bit-cells (standard 6T-SRAM cell consisting of 2 cross-coupled CMOS inverters and 2 access NMOS).',
      'Ultra-low-power IoT micro-controllers and medical pacemakers running on coin-cell batteries.',
      'High-speed CMOS image sensors (CIS) replacing older CCD cameras in smartphones.'
    ],
    commonMistakes: [
      'Believing CMOS logic consumes zero total power; while static DC power is tiny, dynamic switching power (proportional to f * V_DD^2) dominates at gigahertz frequencies.',
      'Forgetting that PMOS conduct when gate is LOW (0V) and turn OFF when gate is HIGH (V_DD).',
      'Using series PMOS for high-fan-in NOR gates; series PMOS have high resistance, severely degrading rise time t_pLH.'
    ],
    vivaQuestions: [
      {
        question: 'Why does CMOS dominate over NMOS-only and TTL logic in modern VLSI systems?',
        answer: 'In older NMOS-only or TTL circuits, a pull-up resistor or saturated depletion load continuously drew significant DC current whenever the output was Low, limiting integration density to a few thousand gates due to thermal dissipation. CMOS consumes virtually zero DC static current because one transistor of the complementary pair is always OFF, enabling the packing of billions of transistors onto a single silicon die.'
      },
      {
        question: 'What is latch-up in bulk CMOS, and how is it prevented?',
        answer: 'Latch-up is an anomalous low-impedance short circuit between V_DD and GND caused by the parasitic p-n-p-n thyristor structure formed by adjacent n-wells and p-substrates. Once triggered by a transient voltage spike, it can destroy the chip. It is prevented by inserting guard rings, using low-resistance epitaxial substrates, and maintaining generous physical spacing between n-wells and substrate taps.'
      }
    ],
    practiceMCQs: [
      {
        question: 'In a 2-input CMOS NAND gate, the Pull-Down Network (PDN) consists of:',
        options: [
          'Two PMOS in parallel',
          'Two NMOS in series',
          'Two NMOS in parallel',
          'One NMOS and one PMOS in series'
        ],
        correctAnswer: 1,
        explanation: 'A NAND gate output is Low only when both inputs A and B are High. Thus, the pull-down path to ground requires two NMOS transistors in series.'
      },
      {
        question: 'Dynamic power dissipation in CMOS logic is directly proportional to:',
        options: ['V_DD', 'V_DD^2', 'V_DD^3', 'sqrt(V_DD)'],
        correctAnswer: 1,
        explanation: 'Dynamic switching power is given by P_dyn = C_L * V_DD^2 * f, exhibiting a quadratic dependence on supply voltage V_DD.'
      }
    ],
    quickRevisionNotes: [
      'CMOS = Complementary NMOS (pull-down) + PMOS (pull-up).',
      'Zero static DC current: in any steady state (0 or 1), one network is completely OFF.',
      'Dynamic power: P_dyn = C_L * V_DD^2 * f (scales quadratically with supply voltage).',
      'Symmetric inverter sizing: (W/L)_p ≈ 2.5 to 3.0 * (W/L)_n to balance lower hole mobility (mu_p < mu_n).',
      'Dual logic rules: Parallel in PUN <=> Series in PDN (NAND has series NMOS; NOR has series PMOS).'
    ]
  },

  'transistor-biasing': {
    id: 'transistor-biasing',
    subjectId: 'electronic_devices',
    order: 9,
    title: 'Transistor Biasing',
    estimatedTime: '50 mins',
    learningObjectives: [
      'Define the Quiescent Operating Point (Q-point) and plot the DC load line on output characteristics.',
      'Analyze Fixed Bias, Collector-Feedback Bias, and Voltage-Divider (Self) Bias topologies.',
      'Derive stability factors S(I_CBO), S\'(V_BE), and S\'\'(beta) to quantify thermal and manufacturing drift.',
      'Demonstrate why Voltage-Divider Bias provides superior beta-independent operating stability.',
      'Formulate the condition to prevent thermal runaway in power BJT amplifiers.'
    ],
    prerequisites: [
      'BJT active mode operation, current equations (I_C = beta * I_B), and Kirchhoff\'s laws.',
      'Thevenin\'s equivalent theorem.'
    ],
    theoryAndConcepts: [
      {
        heading: '1. The Need for Biasing & The Q-Point',
        content: `Transistor Biasing is the process of applying external DC voltages and resistances to establish steady DC currents and voltages (the Quiescent Operating Point or Q-point: [V_CEQ, I_CQ]) in the transistor:
Why Biasing is Essential:
1. Prevent Clipping & Distortion: An AC input signal swings symmetrically above and below the DC Q-point. If the Q-point is too close to Cutoff (near bottom axis), the negative half-cycle is clipped flat. If too close to Saturation (near vertical axis), the positive peak is clipped.
2. Ensure Active Region Operation: Keeps EBJ forward biased and CBJ reverse biased at all times during AC signal excursions.
3. Stabilize against Temperature and Beta Variations: Transistor parameters drift drastically:
   * I_CBO doubles for every 10°C rise in temperature.
   * V_BE decreases by ~2.5 mV/°C.
   * beta (h_FE) can vary by 300% between identical transistor parts from the same manufacturing batch!`
      },
      {
        heading: '2. DC Load Line Analysis',
        content: `Applying KVL around the collector-emitter loop of a common-emitter circuit:
V_CC - I_C * R_C - V_CE = 0 => V_CE = V_CC - I_C * R_C
Plotting this straight line on the BJT output characteristics (I_C vs V_CE) yields the DC Load Line:
1. Y-intercept (Saturation point, V_CE = 0):
   I_C,sat = V_CC / R_C
2. X-intercept (Cutoff point, I_C = 0):
   V_CE,cutoff = V_CC
3. Slope of the line: -1 / R_C.
- The Q-point is the intersection of the DC load line with the specific base current curve I_B. For maximum undistorted symmetrical AC output swing, the Q-point is placed precisely at the midpoint of the load line:
  V_CEQ = V_CC / 2, I_CQ = I_C,sat / 2 = V_CC / (2 * R_C).`
      },
      {
        heading: '3. Comparative Biasing Circuit Topologies',
        content: `1. Fixed Bias (Base Bias):
   * Single resistor R_B connected between V_CC and Base: I_B = (V_CC - V_BE) / R_B.
   * Collector current: I_C = beta * I_B.
   * Stability Factor: S = 1 + beta (worst possible stability!). Any change in beta or temperature shifts I_C drastically. Highly unstable; practically never used in quality designs.
2. Collector-to-Base Feedback Bias:
   * Resistor R_B is connected from Collector to Base instead of V_CC.
   * When temperature rises and I_C increases, the drop across R_C increases, lowering collector voltage V_C.
   * Lower V_C reduces base current I_B, counteracting the rise in I_C (negative feedback!).
   * Stability Factor: S = (1 + beta) / [1 + beta * (R_C / (R_B + R_C))]. Better than fixed bias.
3. Voltage-Divider Bias (Self-Bias / Emitter Bias):
   * Most popular, robust, and widely used biasing scheme.
   * Uses two resistors R_1 and R_2 as a voltage divider to set a stiff base voltage V_B, combined with an emitter resistor R_E.
   * Thevenin Equivalent at Base:
     V_th = V_CC * [R_2 / (R_1 + R_2)]
     R_th = R_1 || R_2 = (R_1 * R_2) / (R_1 + R_2)
   * KVL around base-emitter loop:
     V_th = I_B * R_th + V_BE + I_E * R_E = I_B * R_th + V_BE + (beta + 1) * I_B * R_E
     I_B = (V_th - V_BE) / [R_th + (beta + 1) * R_E]
   * Collector Current:
     I_C ≈ (V_th - V_BE) / [R_E + R_th / beta]
   * Design Rule for Beta-Independence: If R_E >> R_th / beta (or equivalently, R_th <= 0.1 * beta * R_E):
     I_C ≈ (V_th - V_BE) / R_E!
     Notice I_C is completely independent of beta!`
      },
      {
        heading: '4. Stability Factors & Thermal Runaway',
        content: `1. Stability Factor S (with respect to I_CBO):
   * S = partial I_C / partial I_CBO = (1 + beta) * [1 + R_th / R_E] / [1 + beta + R_th / R_E].
   * An ideal circuit has S = 1. Fixed bias has S ≈ beta + 1 (e.g. 150). Well-designed voltage divider bias achieves S ≈ 1.2 to 3!
2. Thermal Runaway:
   * An increase in temperature causes I_C to increase.
   * Increased I_C increases collector power dissipation P_C = V_CE * I_C.
   * Increased power raises junction temperature further: Delta T = theta * Delta P_C (where theta is thermal resistance in °C/W).
   * This positive thermal feedback loop can escalate uncontrollably until the transistor burns out (Thermal Runaway).
   * Condition to Avoid Thermal Runaway:
     partial P_C / partial T < 1 / theta
     In a CE amplifier, thermal runaway is completely avoided if the Q-point satisfies:
     V_CEQ < V_CC / 2!`
      }
    ],
    importantDefinitions: [
      { term: 'Quiescent Operating Point (Q-Point)', definition: 'The steady-state DC operating voltage and current values (V_CEQ, I_CQ) of a transistor amplifier with no AC input signal applied.' },
      { term: 'DC Load Line', definition: 'The linear locus of all possible DC operating points (I_C, V_CE) determined by the power supply voltage and external collector/emitter resistances.' },
      { term: 'Stability Factor (S)', definition: 'The rate of change of collector current with respect to reverse saturation current: S = partial I_C / partial I_CBO.' },
      { term: 'Voltage-Divider Bias', definition: 'A biasing circuit where a resistive divider sets a stable base potential, and an emitter resistor provides negative feedback for beta-independent operation.' },
      { term: 'Thermal Runaway', definition: 'A destructive positive feedback loop where rising temperature increases collector current, boosting power dissipation and further elevating temperature to destruction.' }
    ],
    circuitDiagram: `+--------------------------------------------------------------------------+
|                  VOLTAGE-DIVIDER BIAS (SELF-BIAS) CIRCUIT                |
+--------------------------------------------------------------------------+

                                  + V_CC
                                    |
                    +---------------+---------------+
                    |                               |
                   [ ] R_1                         [ ] R_C
                   [ ]                             [ ]
                    |               C              |
                    +-------------+ |              +----o Output (V_out)
                    |             |/               |
             +------+             |  NPN           | +
             |      |             |\\               |
       V_in o+     [ ] R_2          | E            | V_CE
                   [ ]             [ ]             |
                    |              [ ] R_E         | -
                    |               |              |
                    +---------------+--------------+
                                    |
                                   GND

       Thevenin parameters at base:
       V_th = V_CC * [R_2 / (R_1 + R_2)]
       R_th = R_1 || R_2
       Condition for stability: R_th <= 0.1 * beta * R_E`,
    stepByStepExamples: [
      {
        title: 'Step-by-Step Design: Voltage-Divider Bias Circuit',
        steps: [
          'Design Goal: V_CC = 12 V, Q-point at I_CQ = 2 mA and V_CEQ = 6 V, using transistor with beta = 100 and V_BE = 0.7 V.',
          'Step 1: Allocate emitter voltage drop V_E for negative feedback stability (typically 10% of V_CC): V_E = 0.1 * V_CC = 0.1 * 12 V = 1.2 V.',
          'Step 2: Calculate Emitter Resistor R_E: R_E = V_E / I_E ≈ V_E / I_CQ = 1.2 V / 2 mA = 600 Omega (use standard 620 Omega).',
          'Step 3: Calculate Collector Resistor R_C: From KVL: V_CC - I_C*R_C - V_CE - V_E = 0 => R_C = (V_CC - V_CEQ - V_E) / I_CQ = (12 - 6 - 1.2) / 2 mA = 4.8 V / 2 mA = 2.4 kOmega.',
          'Step 4: Determine Base Voltage V_B: V_B = V_BE + V_E = 0.7 V + 1.2 V = 1.9 V.',
          'Step 5: Apply rule of thumb for beta-independence (divider current I_div = 10 * I_B): I_B = I_CQ / beta = 2 mA / 100 = 20 micro-A. So I_div = 10 * 20 micro-A = 200 micro-A.',
          'Step 6: Compute R_2 and R_1: R_2 = V_B / I_div = 1.9 V / 200 micro-A = 9.5 kOmega (use standard 10 kOmega).',
          'R_1 = (V_CC - V_B) / I_div = (12 - 1.9) / 200 micro-A = 10.1 V / 0.2 mA = 50.5 kOmega (use standard 51 kOmega).'
        ]
      }
    ],
    importantEquations: [
      { equation: 'V_CE = V_CC - I_C * (R_C + R_E)', description: 'DC load line equation' },
      { equation: 'V_th = V_CC * [R_2 / (R_1 + R_2)]', description: 'Thevenin open-circuit base voltage' },
      { equation: 'R_th = (R_1 * R_2) / (R_1 + R_2)', description: 'Thevenin base resistance' },
      { equation: 'I_C ≈ (V_th - V_BE) / [R_E + R_th / beta]', description: 'Collector current in voltage-divider bias' },
      { equation: 'S = (1 + beta) * [1 + R_th / R_E] / [1 + beta + R_th / R_E]', description: 'Stability factor S(I_CBO)' },
      { equation: 'V_CEQ < V_CC / 2', description: 'Criterion to prevent thermal runaway in common-emitter amplifiers' }
    ],
    numericalProblems: [
      {
        problem: 'A voltage-divider biased NPN BJT circuit has V_CC = 15 V, R_1 = 40 kOmega, R_2 = 10 kOmega, R_C = 2.5 kOmega, and R_E = 1.0 kOmega. The transistor has beta = 120 and V_BE = 0.7 V. (a) Determine Thevenin parameters V_th and R_th. (b) Find the Q-point coordinates (I_CQ, V_CEQ). (c) Calculate the stability factor S.',
        solution: `(a) Thevenin equivalent at the base:
V_th = V_CC * [R_2 / (R_1 + R_2)] = 15 V * [10k / (40k + 10k)] = 15 * 0.2 = 3.0 V.
R_th = (R_1 * R_2) / (R_1 + R_2) = (40k * 10k) / 50k = 8.0 kOmega.

(b) Calculate Q-point (I_CQ, V_CEQ):
Base current I_B:
I_B = (V_th - V_BE) / [R_th + (beta + 1) * R_E]
I_B = (3.0 - 0.7) / [8k + (121 * 1.0k)] = 2.3 V / (8k + 121k) = 2.3 V / 129 kOmega = 17.83 micro-Amps.

Collector current I_CQ:
I_CQ = beta * I_B = 120 * 17.83 micro-A = 2.14 mA.
Emitter current I_E = I_B + I_C = 0.018 + 2.14 = 2.16 mA.

Collector-Emitter Voltage V_CEQ:
V_CEQ = V_CC - I_C * R_C - I_E * R_E
V_CEQ = 15 V - (2.14 mA * 2.5 kOmega) - (2.16 mA * 1.0 kOmega)
V_CEQ = 15 - 5.35 - 2.16 = 7.49 V.
Q-Point: (V_CEQ = 7.49 V, I_CQ = 2.14 mA).
Notice V_CEQ = 7.49 V ≈ V_CC / 2 = 7.5 V (perfectly centered on load line!).

(c) Stability factor S:
R_th / R_E = 8 kOmega / 1 kOmega = 8.0.
S = (1 + beta) * [1 + R_th / R_E] / [1 + beta + R_th / R_E]
S = (1 + 120) * [1 + 8] / [1 + 120 + 8] = 121 * 9 / 129 = 1089 / 129 = 8.44.
(Much better than fixed bias where S = 121).`
      }
    ],
    applications: [
      'Linear audio preamplifiers and power amplifier stages requiring distortion-free AC signal swing.',
      'Operational amplifier discrete transistor input stages.',
      'Active analog filters, audio equalizers, and tone-control circuits.',
      'RF oscillators and mixer stages requiring stable DC operating biases across extreme temperature ranges.'
    ],
    commonMistakes: [
      'Choosing R_th too high in a voltage divider bias circuit (violating R_th <= 0.1 * beta * R_E), which makes the circuit sensitive to variations in beta.',
      'Forgetting the emitter resistor voltage drop V_E when calculating V_CEQ, resulting in inaccurate load line placement.',
      'Ignoring thermal runaway in power stages; without adequate emitter resistor feedback or heat sinking, rising temperature destroys the transistor.'
    ],
    vivaQuestions: [
      {
        question: 'Why is Voltage-Divider Bias called Self-Bias or Universal Bias?',
        answer: 'It is called Self-Bias because the emitter resistor R_E provides automatic negative current feedback: if I_C tries to rise due to temperature or beta variation, the emitter drop V_E = I_E * R_E increases, reducing the base-emitter voltage V_BE = V_B - V_E, which forces I_B and I_C back down. It is called Universal Bias because it is universally adopted as the most stable, beta-independent biasing scheme in discrete analog circuit design.'
      },
      {
        question: 'What is the function of the bypass capacitor C_E placed across the emitter resistor R_E?',
        answer: 'While R_E is essential for DC bias stabilization, it would also provide negative feedback for AC signals, severely reducing AC voltage gain. The emitter bypass capacitor C_E provides an ultra-low impedance AC path to ground at operating frequencies (X_CE ≈ 0), preserving DC thermal stability while restoring maximum AC voltage gain.'
      }
    ],
    practiceMCQs: [
      {
        question: 'For maximum undistorted symmetrical AC signal swing, the Q-point on the DC load line should be located:',
        options: [
          'Near the saturation point',
          'Near the cutoff point',
          'Exactly at the midpoint of the load line',
          'At the origin (0,0)'
        ],
        correctAnswer: 2,
        explanation: 'Placing the Q-point at the exact midpoint of the load line (V_CEQ = V_CC/2) allows maximum equal peak-to-peak signal excursions in both positive and negative directions without clipping into cutoff or saturation.'
      },
      {
        question: 'The condition to guarantee that collector current I_C is independent of transistor beta in a voltage-divider bias circuit is:',
        options: [
          'R_th >= beta * R_E',
          'R_th <= 0.1 * beta * R_E',
          'R_C = R_E',
          'beta = 1'
        ],
        correctAnswer: 1,
        explanation: 'When Thevenin base resistance R_th <= 0.1 * beta * R_E, the term R_th / beta in the denominator becomes negligible compared to R_E, making I_C ≈ (V_th - V_BE) / R_E, which is independent of beta.'
      }
    ],
    quickRevisionNotes: [
      'Biasing establishes a stable DC Q-point (V_CEQ, I_CQ) in the active region.',
      'DC Load Line: V_CE = V_CC - I_C*(R_C + R_E). Saturation intercept: V_CC/(R_C+R_E), Cutoff intercept: V_CC.',
      'Midpoint bias (V_CEQ = V_CC/2) gives maximum symmetrical AC dynamic range.',
      'Fixed bias: S = 1 + beta (highly unstable).',
      'Voltage-Divider bias: Most stable (S ≈ 1-10). Condition for beta-independence: R_th <= 0.1 * beta * R_E.',
      'Thermal runaway condition to avoid: V_CEQ < V_CC / 2.'
    ]
  }
};
