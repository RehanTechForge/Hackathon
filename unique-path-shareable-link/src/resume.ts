document.addEventListener("DOMContentLoaded", () => {
  const resumePreview = document.getElementById("resumePreview");

  // Get the unique ID from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const uniqueId = urlParams.get("id");

  if (uniqueId) {
    // Retrieve resume data from localStorage
    const resumeData = localStorage.getItem(uniqueId);

    if (resumeData) {
      const data = JSON.parse(resumeData);

      // Display the resume data
      resumePreview.innerHTML = `
        <h2>${data.name}'s Resume</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <h3>Education</h3>
        ${
          data.education.length > 0
            ? data.education
                .map(
                  (edu) => `
              <p><strong>Degree:</strong> ${edu.degree}</p>
              <p><strong>Institution:</strong> ${edu.institution}</p>
              <p><strong>Year of Graduation:</strong> ${edu.year}</p>
            `
                )
                .join("")
            : "<p>No education details provided.</p>"
        }
        <h3>Work Experience</h3>
        ${
          data.workExperience.length > 0
            ? data.workExperience
                .map(
                  (exp) => `
              <p><strong>Job Title:</strong> ${exp.jobTitle}</p>
              <p><strong>Company:</strong> ${exp.company}</p>
              <p><strong>Start Date:</strong> ${exp.startDate}</p>
              <p><strong>End Date:</strong> ${exp.endDate}</p>
              <p><strong>Responsibilities:</strong> ${exp.responsibilities}</p>
            `
                )
                .join("")
            : "<p>No work experience provided.</p>"
        }
        <h3>Skills</h3>
        <p>${data.skills.join(", ")}</p>
        <button id="downloadButton">Download Resume</button>
      `;

      // Add event listener for the download button
      const downloadButton = document.getElementById("downloadButton");
      downloadButton.addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.name}_resume.json`;
        a.click();
        URL.revokeObjectURL(url);
      });
    } else {
      resumePreview.innerHTML = "<p>No resume data found.</p>";
    }
  } else {
    resumePreview.innerHTML = "<p>No resume ID provided.</p>";
  }
});
