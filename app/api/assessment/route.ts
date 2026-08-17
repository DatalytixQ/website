import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Inicializa cliente de Supabase (Server-side solo usando Anon Key ya que RLS permite Insert)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, role, answers } = body;

    // Validación básica
    if (!name || !email || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    // Validación de Email básica y muy rápida (Regex + dominios desechables comunes)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: "Verifique que su dirección de correo esté escrita correctamente." 
      }, { status: 400 });
    }

    const disposableDomains = [
      "mailinator.com", "yopmail.com", "10minutemail.com", "tempmail.com", "guerrillamail.com",
      "sharklasers.com", "dispostable.com", "temp-mail.org", "throwawaymail.com", "catchthisemail.com"
    ];
    
    const domain = email.split('@')[1]?.toLowerCase();
    if (disposableDomains.includes(domain)) {
      return NextResponse.json({ 
        error: "Por favor, utilice una cuenta de correo corporativa válida." 
      }, { status: 400 });
    }

    // ---------------------------------------------------------
    // MOTOR MATEMÁTICO AVANZADO: Generación de Hallazgos y Categorías
    // Max score total = 49
    // ---------------------------------------------------------
    let scoreTotal = 0;
    const categoryScores = {
      "Entorno ERP": { score: 0, max: 9 },
      "Visibilidad Operacional": { score: 0, max: 12 },
      "Automatización": { score: 0, max: 12 },
      "Inteligencia de Decisión": { score: 0, max: 16 }
    };
    
    const ansMap: Record<string, number> = {};

    answers.forEach((ans: { question_id: string; value: number }) => {
      scoreTotal += ans.value;
      ansMap[ans.question_id] = ans.value;
      
      if (['q1', 'q2', 'q3'].includes(ans.question_id)) categoryScores["Entorno ERP"].score += ans.value;
      if (['q4', 'q5', 'q6'].includes(ans.question_id)) categoryScores["Visibilidad Operacional"].score += ans.value;
      if (['q7', 'q8', 'q9'].includes(ans.question_id)) categoryScores["Automatización"].score += ans.value;
      if (['q10', 'q11', 'q12', 'q13'].includes(ans.question_id)) categoryScores["Inteligencia de Decisión"].score += ans.value;
    });

    const categoryPercentages = {
      entorno: Math.round((categoryScores["Entorno ERP"].score / categoryScores["Entorno ERP"].max) * 100),
      visibilidad: Math.round((categoryScores["Visibilidad Operacional"].score / categoryScores["Visibilidad Operacional"].max) * 100),
      automatizacion: Math.round((categoryScores["Automatización"].score / categoryScores["Automatización"].max) * 100),
      inteligencia: Math.round((categoryScores["Inteligencia de Decisión"].score / categoryScores["Inteligencia de Decisión"].max) * 100)
    };

    let frictionLevel = "Crítico";
    let transformationOpportunity = null;

    if (scoreTotal >= 39) {
      frictionLevel = "Bajo";
      transformationOpportunity = "Oportunidad de Optimización: Su entorno es altamente maduro. El siguiente paso es explorar modelos predictivos avanzados sobre una arquitectura ya estabilizada.";
    } else if (scoreTotal >= 25) {
      frictionLevel = "Medio";
      transformationOpportunity = "Oportunidad de Modernización: La organización ha resuelto lo básico, pero existe una gran oportunidad para automatizar flujos y ganar visibilidad real.";
    } else {
      transformationOpportunity = "Oportunidad de Transformación Crítica: Su entorno operacional concentra un potencial de mejora significativo en el corto plazo, con impacto directo sobre margen y capacidad de decisión.";
    }

    // --- GENERACIÓN DE HALLAZGOS (HEURÍSTICAS CON VARIABILIDAD) ---
    const findings = [];
    
    // Función helper para elegir un hallazgo aleatorio
    const getRandomVariation = (variations: {title: string, description: string}[]) => {
      return variations[Math.floor(Math.random() * variations.length)];
    };

    if (scoreTotal < 25) {
      findings.push(getRandomVariation([
        {
          title: "El ERP como Centro de Costo, no de Rentabilidad",
          description: "Su ERP opera principalmente como sistema de registro. La inversión ya realizada no está devolviendo capacidad de decisión anticipada: se paga la infraestructura sin capturar el retorno operacional que habilita."
        },
        {
          title: "Subutilización del Entorno Transaccional",
          description: "Notamos que su plataforma actual funciona más como un repositorio histórico que como un motor activo. El sistema está subutilizado en su capacidad de generar alertas de negocio tempranas."
        },
        {
          title: "Bajo Retorno sobre la Inversión en Datos",
          description: "El esfuerzo de ingreso de datos a su sistema no se correlaciona con la velocidad en la que obtienen insights. Es necesario transformar el repositorio pasivo en un ecosistema predictivo."
        }
      ]));
    }

    if (ansMap['q4'] <= 2) {
      findings.push(getRandomVariation([
        {
          title: "Decisiones con Información Vencida",
          description: "La dirección está tomando decisiones sobre una fotografía del pasado. Cada día de retraso en la visibilidad extiende la exposición a desvíos de costo que ya ocurrieron y no pueden corregirse."
        },
        {
          title: "Latencia Crítica en la Visibilidad Operacional",
          description: "Sus reportes reflejan el estado del negocio con días de desfase. Actuar sobre información que no es en tiempo real limita drásticamente la capacidad de reaccionar ante quiebres de stock o variaciones de demanda."
        },
        {
          title: "Gestión Reactiva en lugar de Proactiva",
          description: "La ausencia de dashboards en tiempo real obliga a los equipos a gestionar crisis operacionales cuando el problema ya impactó los márgenes, impidiendo la mitigación preventiva."
        }
      ]));
    }

    if (ansMap['q7'] <= 2) {
      findings.push(getRandomVariation([
        {
          title: "Riesgo de Fuga de Capital por Procesos Manuales",
          description: "Su alta dependencia de planillas fuera del ERP sugiere que decisiones estratégicas se están tomando con datos asíncronos y manipulados manualmente. Esto típicamente aumenta el riesgo de errores."
        },
        {
          title: "Fragmentación de la Verdad Operacional",
          description: "La proliferación de hojas de cálculo operando en paralelo al ERP genera múltiples versiones de la verdad. Esto debilita la integridad de los datos y oculta ineficiencias operativas."
        },
        {
          title: "Vulnerabilidad en Procesos Críticos",
          description: "Los flujos de trabajo que dependen de intervenciones manuales constantes y cruces de Excel representan un punto de fallo significativo y un freno para la escalabilidad del negocio."
        }
      ]));
    }

    if (ansMap['q8'] <= 2) {
      findings.push(getRandomVariation([
        {
          title: "Costo Oculto de Horas Ejecutivas",
          description: "Equipos calificados destinan una porción relevante de su tiempo a consolidar y reconciliar información en lugar de analizarla. Es capital humano de alto costo aplicado a tareas transaccionales."
        },
        {
          title: "Ineficiencia en el Talento Analítico",
          description: "Gran parte del esfuerzo de su equipo se consume en extraer y limpiar datos. Al automatizar estas tareas repetitivas, se liberan miles de horas para análisis estratégico de alto valor."
        },
        {
          title: "Fricción Administrativa Severa",
          description: "La falta de automatización operacional obliga a su equipo a actuar como 'integradores humanos' entre sistemas, lo que disminuye la velocidad de la organización frente a sus competidores."
        }
      ]));
    }

    if (ansMap['q9'] <= 2) {
      findings.push(getRandomVariation([
        {
          title: "Ventana de Reacción Demasiado Amplia",
          description: "Los desvíos se detectan cuando ya impactaron el resultado. Acortar esa ventana con alertas e indicadores en tiempo real es, en la práctica, recuperar margen que hoy se pierde."
        },
        {
          title: "Ausencia de Alertas de Negocio Tempranas",
          description: "Sin inteligencia embebida en sus flujos, la operación depende de la revisión manual para detectar excepciones, provocando respuestas tardías a problemas críticos."
        },
        {
          title: "Puntos Ciegos Operacionales",
          description: "La incapacidad de detectar anomalías operativas de forma automática genera puntos ciegos. Implementar monitoreo impulsado por IA cerraría esta brecha instantáneamente."
        }
      ]));
    }

    if (findings.length === 0) {
      findings.push(getRandomVariation([
        {
          title: "Operación de Alta Madurez",
          description: "Sus procesos actuales demuestran un nivel sobresaliente de digitalización y proactividad."
        },
        {
          title: "Arquitectura Transaccional Sólida",
          description: "Las respuestas indican un entorno altamente automatizado y maduro, excelente punto de partida para IA avanzada."
        }
      ]));
    }

    // 1. Generar ID único desde el backend para evitar problemas de RLS (Select)
    const leadId = crypto.randomUUID();

    // 2. Guardar Lead en CRM (Supabase) con nueva data
    const { error: leadError } = await supabase
      .from("leads")
      .insert([
        {
          id: leadId,
          name,
          email,
          company: company || null,
          role: role || null,
          score_total: scoreTotal,
          friction_level: frictionLevel,
          category_scores: categoryPercentages,
          findings: findings,
          transformation_opportunity: transformationOpportunity
        },
      ]);

    if (leadError) {
      console.error("CRITICAL ERROR: No se pudo guardar el lead en Supabase:", leadError);
      
      return NextResponse.json({
        success: true,
        score: scoreTotal,
        friction_level: frictionLevel,
        category_percentages: categoryPercentages,
        findings: findings,
        transformation_opportunity: transformationOpportunity
      });
    }

    // 3. Guardar respuestas detalladas (para Analítica posterior)
    const responsesToInsert = answers.map((ans: { question_id: string; value: number }) => ({
      lead_id: leadId,
      question_id: ans.question_id,
      answer_value: ans.value,
    }));

    const { error: responsesError } = await supabase
      .from("assessment_responses")
      .insert(responsesToInsert);

    if (responsesError) {
      console.error("Error guardando respuestas:", responsesError);
    }

    // 4. Integración con Resend (Fase 3 final / Notificación Email)
    try {
      const normalizedScore = Math.round((scoreTotal / 49) * 100);
      const findingsHtml = findings.map(f => `<li><strong>${f.title}</strong>: ${f.description}</li>`).join("");
      
      await resend.emails.send({
        from: "Datalytix Quest <notificaciones@datalytixquest.com>",
        to: ["dario.quintas@datalytixquest.com"],
        subject: `🔥 Nuevo Lead Operacional: ${name} de ${company || "Empresa Desconocida"}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
            <h2 style="color: #0f172a;">¡Nuevo Lead Capturado!</h2>
            <p>Un usuario ha completado el assessment de Inteligencia Operacional.</p>
            
            <h3 style="color: #334155; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">Datos de Contacto:</h3>
            <ul>
              <li><strong>Nombre:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Empresa:</strong> ${company || "No provisto"}</li>
              <li><strong>Cargo:</strong> ${role || "No provisto"}</li>
            </ul>

            <h3 style="color: #334155; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">Resultados Analíticos:</h3>
            <ul>
              <li><strong>Nivel de Fricción:</strong> ${frictionLevel}</li>
              <li><strong>Score:</strong> ${normalizedScore} / 100</li>
            </ul>

            <h3 style="color: #334155; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">Desglose por Área:</h3>
            <ul>
              <li>Entorno ERP: ${categoryPercentages.entorno}%</li>
              <li>Visibilidad: ${categoryPercentages.visibilidad}%</li>
              <li>Automatización: ${categoryPercentages.automatizacion}%</li>
              <li>Inteligencia de Decisión: ${categoryPercentages.inteligencia}%</li>
            </ul>

            <h3 style="color: #334155; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">Hallazgos Detectados:</h3>
            <ul>
              ${findingsHtml}
            </ul>

            <h3 style="color: #334155; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">🎯 Oportunidad de Transformación (Solo Interno):</h3>
            <p style="color: #b45309; font-weight: bold; padding: 12px; background-color: #fffbeb; border-left: 4px solid #f59e0b;">
              ${transformationOpportunity}
            </p>

            <p style="font-size: 12px; color: #64748b; margin-top: 32px;">Revisa el CRM en Supabase para obtener la data transaccional cruda.</p>
          </div>
        `
      });
      console.log("Notificación enviada por Resend a dario.quintas@datalytixquest.com");
    } catch (emailError) {
      console.error("Error silencioso al enviar email con Resend:", emailError);
    }

    // Retornar resultados al Frontend
    return NextResponse.json({
      success: true,
      lead_id: leadId,
      name: name,
      score: scoreTotal,
      friction_level: frictionLevel,
      category_percentages: categoryPercentages,
      findings: findings,
      transformation_opportunity: transformationOpportunity
    });
    
  } catch (error) {
    console.error("API Error en /api/assessment:", error);
    return NextResponse.json({
      success: true,
      score: 25, 
      friction_level: "Medio",
      category_percentages: { entorno: 50, visibilidad: 50, automatizacion: 50, inteligencia: 50 },
      findings: [],
      transformation_opportunity: "Error calculando reporte detallado."
    });
  }
}
