import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import emailValidator from "deep-email-validator";
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

    // Validación de Email (Regex y Desechables únicamente)
    const emailValidation = await emailValidator({
      email: email,
      validateRegex: true,
      validateMx: false, // Desactivado para evitar bloqueos por DNS corporativos lentos o privados
      validateTypo: false, // Desactivado para evitar falsos positivos (ej. rechazar correos reales que parecen typos)
      validateDisposable: true, // Bloquea correos temporales (mailinator, etc.)
      validateSMTP: false, 
    });

    if (!emailValidation.valid) {
      return NextResponse.json({ 
        error: "Verifique que su dirección de correo esté escrita correctamente y sea una cuenta corporativa válida." 
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

    // --- GENERACIÓN DE HALLAZGOS (HEURÍSTICAS) ---
    const findings = [];

    if (scoreTotal < 25) {
      findings.push({
        title: "ERP como Centro de Costo, no de Rentabilidad",
        description: "Su ERP opera principalmente como sistema de registro. La inversión ya realizada en licencias y datos no está devolviendo capacidad de decisión: se paga la infraestructura sin capturar el retorno operacional que habilita."
      });
    }

    if (ansMap['q4'] <= 2) {
      findings.push({
        title: "Decisiones con Información Vencida",
        description: "La dirección está tomando decisiones sobre una fotografía del pasado. Cada día de retraso en la visibilidad extiende la exposición a desvíos de costo, quiebres de stock y sobrecompras que ya ocurrieron y no pueden corregirse."
      });
    }

    if (ansMap['q7'] <= 2) {
      findings.push({
        title: "Riesgo de Fuga de Capital",
        description: "Su alta dependencia de planillas fuera del ERP sugiere que decisiones estratégicas se están tomando con datos asíncronos y manipulados manualmente. Esto típicamente aumenta el riesgo de errores y oculta ineficiencias operativas que cuestan puntos de rentabilidad."
      });
    }

    if (ansMap['q8'] <= 2) {
      findings.push({
        title: "Costo Oculto de Horas Ejecutivas",
        description: "Equipos calificados destinan una porción relevante de su tiempo a consolidar, cruzar y reconciliar información en lugar de analizarla. Es capital humano de alto costo aplicado a tareas que una capa de automatización absorbe de forma continua."
      });
    }

    if (ansMap['q9'] <= 2) {
      findings.push({
        title: "Ventana de Reacción Demasiado Amplia",
        description: "Los desvíos se detectan cuando ya impactaron el resultado. Acortar esa ventana con alertas e indicadores en tiempo real es, en la práctica, recuperar margen que hoy se pierde de forma silenciosa."
      });
    }

    if (findings.length === 0) {
      findings.push({
        title: "Operación de Alta Madurez",
        description: "Sus procesos actuales demuestran un nivel sobresaliente de digitalización y proactividad."
      });
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
