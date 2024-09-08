// app.ts
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resumeForm") as HTMLFormElement;
  const resumePreview = document.getElementById(
    "resumePreview"
  ) as HTMLDivElement;
  const educationEntries = document.getElementById(
    "educationEntries"
  ) as HTMLDivElement;
  const workExperienceEntries = document.getElementById(
    "workExperienceEntries"
  ) as HTMLDivElement;
  const addEducationButton = document.getElementById(
    "addEducation"
  ) as HTMLButtonElement;
  const addWorkExperienceButton = document.getElementById(
    "addWorkExperience"
  ) as HTMLButtonElement;

  let educationCount = 0;
  let workExperienceCount = 0;

  addEducationButton.addEventListener("click", () => {
    if (!areEducationEntriesFilled() || hasPendingEducationEntry()) {
      alert(
        "Please fill out the current education entries before adding a new one."
      );
    } else {
      educationCount++;
      addEducationEntry(educationCount);
    }
  });

  addWorkExperienceButton.addEventListener("click", () => {
    if (!areWorkExperienceEntriesFilled() || hasPendingWorkExperienceEntry()) {
      alert(
        "Please fill out the current work experience entries before adding a new one."
      );
    } else {
      workExperienceCount++;
      addWorkExperienceEntry(workExperienceCount);
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      education: getEntries("education"),
      workExperience: getEntries("workExperience"),
      skills: (formData.get("skills") as string)
        .split(",")
        .map((skill) => skill.trim()),
    };

    resumePreview.style.marginTop = "20px";
    resumePreview.style.padding = "10px";
    resumePreview.style.border = "1px solid #ddd";
    resumePreview.style.borderRadius = "8px";
    resumePreview.style.backgroundColor = "#f9f9f9";
    renderResume(data);
  });

  function getEntries(type: string) {
    const entries: any[] = [];
    const containers = document.querySelectorAll(`.${type}-entry`);
    containers.forEach((container: Element) => {
      const inputs = (container as HTMLElement).querySelectorAll(
        "input, textarea"
      );
      const entry: any = {};
      inputs.forEach((input) => {
        const name = (input as HTMLInputElement).name.split(/(?<=\D)(?=\d)/)[0]; // Remove index from name
        const index = (input as HTMLInputElement).name.match(/\d+$/)?.[0] || "";
        if (!entries[index]) {
          entries[index] = {};
        }
        entries[index][name] = (
          input as HTMLInputElement | HTMLTextAreaElement
        ).value.trim();
      });
    });
    console.log(`${type} Entries:`, entries); // Debugging log
    return entries.filter((entry) =>
      Object.values(entry).some((value) => value)
    ); // Filter out empty entries
  }

  function addEducationEntry(index: number) {
    educationEntries.insertAdjacentHTML(
      "beforeend",
      `
            <div class="entry-container education-entry">
                <label for="degree${index}">Degree:</label>
                <input type="text" id="degree${index}" name="degree${index}">
                
                <label for="institution${index}">Institution:</label>
                <input type="text" id="institution${index}" name="institution${index}">
                
                <label for="year${index}">Year of Graduation:</label>
                <input type="text" id="year${index}" name="year${index}">
                
                <button type="button" class="remove-button">Remove</button>
            </div>
        `
    );

    // Add event listener to the remove button
    const removeButton = educationEntries.querySelector(
      `.education-entry:last-child .remove-button`
    ) as HTMLButtonElement;
    removeButton.addEventListener("click", () => {
      removeButton.parentElement?.remove();
    });
  }

  function addWorkExperienceEntry(index: number) {
    workExperienceEntries.insertAdjacentHTML(
      "beforeend",
      `
            <div class="entry-container workExperience-entry">
                <label for="jobTitle${index}">Job Title:</label>
                <input type="text" id="jobTitle${index}" name="jobTitle${index}">
                
                <label for="company${index}">Company:</label>
                <input type="text" id="company${index}" name="company${index}">
                
                <label for="startDate${index}">Start Date:</label>
                <input type="date" id="startDate${index}" name="startDate${index}">
                
                <label for="endDate${index}">End Date:</label>
                <input type="date" id="endDate${index}" name="endDate${index}">
                
                <label for="responsibilities${index}">Responsibilities:</label>
                <textarea id="responsibilities${index}" name="responsibilities${index}"></textarea>
                
                <button type="button" class="remove-button">Remove</button>
            </div>
        `
    );

    // Add event listener to the remove button
    const removeButton = workExperienceEntries.querySelector(
      `.workExperience-entry:last-child .remove-button`
    ) as HTMLButtonElement;
    removeButton.addEventListener("click", () => {
      removeButton.parentElement?.remove();
    });
  }

  function areEducationEntriesFilled(): boolean {
    const entries = document.querySelectorAll(".education-entry");
    return Array.from(entries).every((entry: Element) => {
      const inputs = (entry as HTMLElement).querySelectorAll("input");
      return Array.from(inputs).every(
        (input: HTMLInputElement) => input.value.trim() !== ""
      );
    });
  }

  function areWorkExperienceEntriesFilled(): boolean {
    const entries = document.querySelectorAll(".workExperience-entry");
    return Array.from(entries).every((entry: Element) => {
      const inputs = (entry as HTMLElement).querySelectorAll("input, textarea");
      return Array.from(inputs).every(
        (input: HTMLInputElement | HTMLTextAreaElement) =>
          input.value.trim() !== ""
      );
    });
  }

  function hasPendingEducationEntry(): boolean {
    const entries = document.querySelectorAll(".education-entry");
    return Array.from(entries).some((entry: Element) => {
      const inputs = (entry as HTMLElement).querySelectorAll("input");
      return Array.from(inputs).some(
        (input: HTMLInputElement) => input.value.trim() === ""
      );
    });
  }

  function hasPendingWorkExperienceEntry(): boolean {
    const entries = document.querySelectorAll(".workExperience-entry");
    return Array.from(entries).some((entry: Element) => {
      const inputs = (entry as HTMLElement).querySelectorAll("input, textarea");
      return Array.from(inputs).some(
        (input: HTMLInputElement | HTMLTextAreaElement) =>
          input.value.trim() === ""
      );
    });
  }

  function renderResume(data: any) {
    resumePreview.innerHTML = `
    <h2>Resume</h2>
    <p><strong>Name:</strong> <span contenteditable="true" data-field="name">${
      data.name || "Not provided"
    }</span></p>
    <p><strong>Email:</strong> <span contenteditable="true" data-field="email">${
      data.email || "Not provided"
    }</span></p>
    <p><strong>Phone:</strong> <span contenteditable="true" data-field="phone">${
      data.phone || "Not provided"
    }</span></p>
    <h3>Education</h3>
    ${
      data.education.length > 0
        ? data.education
            .map(
              (edu: any, index: number) => `
              <div class="editable-section" data-type="education" data-index="${index}">
                <p><strong>Degree:</strong> <span contenteditable="true" data-field="degree">${
                  edu.degree || "Not provided"
                }</span></p>
                <p><strong>Institution:</strong> <span contenteditable="true" data-field="institution">${
                  edu.institution || "Not provided"
                }</span></p>
                <p><strong>Year of Graduation:</strong> <span contenteditable="true" data-field="year">${
                  edu.year || "Not provided"
                }</span></p>
              </div>
            `
            )
            .join("")
        : "<p>No education details provided. Click here to add some.</p>"
    }
    <h3>Work Experience</h3>
    ${
      data.workExperience.length > 0
        ? data.workExperience
            .map(
              (exp: any, index: number) => `
              <div class="editable-section" data-type="workExperience" data-index="${index}">
                <p><strong>Job Title:</strong> <span contenteditable="true" data-field="jobTitle">${
                  exp.jobTitle || "Not provided"
                }</span></p>
                <p><strong>Company:</strong> <span contenteditable="true" data-field="company">${
                  exp.company || "Not provided"
                }</span></p>
                <p><strong>Start Date:</strong> <span contenteditable="true" data-field="startDate">${
                  exp.startDate || "Not provided"
                }</span></p>
                <p><strong>End Date:</strong> <span contenteditable="true" data-field="endDate">${
                  exp.endDate || "Not provided"
                }</span></p>
                <p><strong>Responsibilities:</strong> <span contenteditable="true" data-field="responsibilities">${
                  exp.responsibilities || "Not provided"
                }</span></p>
              </div>
            `
            )
            .join("")
        : "<p>No work experience provided. Click here to add some.</p>"
    }
    <h3>Skills</h3>
    <p><span contenteditable="true" data-field="skills">${
      data.skills.length > 0 ? data.skills.join(", ") : "No skills provided"
    }</span></p>
  `;

    // Add event listeners for editable fields
    document
      .querySelectorAll("[contenteditable]")
      .forEach((element: HTMLElement) => {
        element.addEventListener("blur", (event) => {
          const target = event.target as HTMLElement;
          const field = target.getAttribute("data-field");
          const type =
            target.closest(".editable-section")?.getAttribute("data-type") ||
            "";
          const index =
            target.closest(".editable-section")?.getAttribute("data-index") ||
            "";
          const value = target.textContent?.trim() || "";

          if (type && index) {
            // Update the corresponding entry
            updateEntry(type, index, field, value);
          } else {
            // Update general fields
            updateGeneralField(field, value);
          }
        });
      });
  }

  function updateEntry(
    type: string,
    index: string,
    field: string | null,
    value: string
  ) {
    // Locate the appropriate section and update the field
    if (type === "education") {
      const entry = educationEntries.querySelector(
        `.education-entry:nth-child(${+index + 1})`
      ) as HTMLElement;
      if (entry) {
        const input = entry.querySelector(
          `[name=${field}${index}]`
        ) as HTMLInputElement;
        if (input) {
          input.value = value;
        }
      }
    } else if (type === "workExperience") {
      const entry = workExperienceEntries.querySelector(
        `.workExperience-entry:nth-child(${+index + 1})`
      ) as HTMLElement;
      if (entry) {
        const input = entry.querySelector(`[name=${field}${index}]`) as
          | HTMLInputElement
          | HTMLTextAreaElement;
        if (input) {
          input.value = value;
        }
      }
    }
  }

  function updateGeneralField(field: string | null, value: string) {
    if (field) {
      const input = form.querySelector(`[name=${field}]`) as
        | HTMLInputElement
        | HTMLTextAreaElement;
      if (input) {
        input.value = value;
      }
    }
  }
});
