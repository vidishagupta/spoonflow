/**
 * SpoonFlow Gentle Boundary & Communication Generator
 * Crafts compassionate, professional boundary messages to protect energy
 */

export const BOUNDARY_TEMPLATES = {
  capacity: {
    manager: {
      professional: "Hi [Name],\n\nI wanted to share a quick update on my capacity today. To ensure high quality on [High Priority Project], I am currently at full bandwidth and won't be able to take on [Task] before [Suggested Date]. Let me know if you would like me to reprioritize other deliverables.\n\nThank you for understanding,\n[Your Name]",
      concise: "Hi [Name] — I'm at full capacity today and prioritizing [Project]. I will tackle [Task] on [Date] once bandwidth opens up.\n\nBest,\n[Your Name]",
      casual: "Hey [Name], just flagging that my plate is full today. I'm focusing on [Project] and will get to [Task] as soon as I can later this week!"
    },
    colleague: {
      professional: "Hi [Name],\n\nThanks for reaching out! I want to give this the attention it deserves, but I'm currently fully committed to [Current Task]. Can we revisit this on [Date]?\n\nWarmly,\n[Your Name]",
      concise: "Hey [Name] — at capacity today. I can take a look at this on [Date].\n\nThanks,\n[Your Name]",
      casual: "Hey! Head down on [Current Task] today and low on bandwidth. I'll review this first thing [Date]!"
    },
    client: {
      professional: "Dear [Name],\n\nThank you for your note. To ensure we deliver the highest quality on our current milestones, our team's schedule is fully booked for today. We have slated your request for review on [Date].\n\nBest regards,\n[Your Name]",
      concise: "Hello [Name] — received with thanks. We are at full capacity today and will begin reviewing this on [Date].\n\nRegards,\n[Your Name]",
      casual: "Hi [Name], thanks for sending this over! We're deep into our planned deliverables today, so I'll follow up on this on [Date]."
    },
    academic: {
      professional: "Dear Professor [Name],\n\nI hope you are having a productive week. Due to a flare-up of my health condition and cognitive fatigue, I am pacing my study workload to maintain quality. Would it be possible to submit [Assignment] on [Date]? I appreciate your guidance and support.\n\nSincerely,\n[Your Name]",
      concise: "Dear Professor [Name],\n\nDue to health accommodations and current capacity constraints, I request an extension for [Assignment] until [Date]. Thank you for your consideration.\n\nBest,\n[Your Name]",
      casual: "Hi Professor [Name], writing to request a short extension on [Assignment] until [Date] due to health pacing. Thank you for your flexibility!"
    }
  },

  reschedule: {
    manager: {
      professional: "Hi [Name],\n\nI am experiencing low physical stamina today and want to ensure our discussion is focused and productive. Could we reschedule our sync to [Day/Time] or handle any urgent updates asynchronously over Slack?\n\nThank you,\n[Your Name]",
      concise: "Hi [Name] — feeling under the weather today. Could we push our sync to [Day/Time]? Happy to answer quick questions asynchronously.\n\nThanks,\n[Your Name]",
      casual: "Hey [Name], my energy is running low today. Could we move our chat to [Day/Time]? Appreciate the flexibility!"
    },
    colleague: {
      professional: "Hi [Name],\n\nI won't be able to give our meeting the energy it deserves today. Would you be open to moving our call to [Day/Time] or doing a quick async write-up?\n\nBest,\n[Your Name]",
      concise: "Hey [Name], need to reschedule our sync today to preserve bandwidth. Does [Day/Time] work for you?",
      casual: "Hey! Need to take today a bit slower. Can we reschedule our call to [Day/Time]?"
    },
    client: {
      professional: "Dear [Name],\n\nDue to unforeseen scheduling constraints today, I would like to kindly propose rescheduling our call to [Day/Time]. I want to ensure we have dedicated, undistracted focus for your project.\n\nWarm regards,\n[Your Name]",
      concise: "Hello [Name], I need to reschedule our discussion scheduled for today. Does [Day/Time] work on your end?\n\nBest,\n[Your Name]",
      casual: "Hi [Name], proposing we move today's sync to [Day/Time] so we can give it our full attention. Thank you!"
    },
    academic: {
      professional: "Dear Professor [Name],\n\nI am writing to see if we might reschedule our scheduled office hours meeting to [Day/Time] due to health constraints today. Thank you for your understanding.\n\nSincerely,\n[Your Name]",
      concise: "Dear Professor [Name], I am unwell today and request moving our appointment to [Day/Time]. Thank you,\n[Your Name]",
      casual: "Hi Professor [Name], won't be able to make our meeting today due to health pacing. Can we connect on [Day/Time] instead?"
    }
  },

  asyncOnly: {
    manager: {
      professional: "Hi [Name],\n\nTo maximize focus and manage fatigue today, I am working in an async-first mode. Please drop any tasks or questions in this thread, and I will review and reply throughout the afternoon.\n\nThank you,\n[Your Name]",
      concise: "Hi [Name] — working asynchronously today to preserve focus. Please send updates via message and I'll reply promptly.\n\nBest,\n[Your Name]",
      casual: "Hey [Name], going async today for deep focus and energy management. Tag me on Slack if anything urgent pops up!"
    },
    colleague: {
      professional: "Hey [Name] — I'm keeping meetings to a minimum today for energy management. Mind sending over the details in writing so I can review asynchronously?\n\nThanks,\n[Your Name]",
      concise: "Hey [Name], can we handle this async over chat? Low bandwidth for calls today.\n\nThanks,\n[Your Name]",
      casual: "Hey! Brain is running low on meeting battery today — could you drop the bullet points here instead? Thanks a bunch!"
    },
    client: {
      professional: "Dear [Name],\n\nTo ensure our team can focus on executing your deliverables today, we are handling inquiries via email. Please send over any questions, and we will follow up with detailed written answers.\n\nWarmly,\n[Your Name]",
      concise: "Hello [Name] — for faster progress on today's milestones, please email through your questions and we will address them asynchronously.\n\nBest,\n[Your Name]",
      casual: "Hi [Name], doing a heads-down build day today! Shoot your notes here and I'll review them shortly."
    },
    academic: {
      professional: "Dear Professor [Name],\n\nI am pacing my cognitive energy today and would appreciate if we could address our questions via email rather than in-person office hours if convenient for you.\n\nThank you,\n[Your Name]",
      concise: "Dear Professor [Name], requesting to handle today's questions via email to accommodate health needs. Thank you,\n[Your Name]",
      casual: "Hi Professor [Name], could I send my questions via email today instead of a live call? Thank you!"
    }
  }
};

export function getBoundaryMessage(scenario = 'capacity', recipient = 'colleague', tone = 'professional') {
  const scenarioObj = BOUNDARY_TEMPLATES[scenario] || BOUNDARY_TEMPLATES.capacity;
  const recipientObj = scenarioObj[recipient] || scenarioObj.colleague;
  return recipientObj[tone] || recipientObj.professional;
}
