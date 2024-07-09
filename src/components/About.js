import React from 'react';


const About = () => {
  return (
    <div>
      <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      <strong>Intro for this application</strong>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      Welcome to <strong>iNotebook</strong>, your digital notebook in the cloud! With iNotebook, you can easily jot down your thoughts, ideas, and to-do lists, and access them from anywhere. Our secure login and signup pages ensure that your notes are always <code>safe and private</code>.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      <strong>CRUD operations</strong>
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      Once logged in, you can seamlessly perform <strong>CRUD operations</strong> on your notes. Need to <code>create a new note</code>? Just click <code>'Add Note'</code> and start typing. Want to <code>update an existing note</code>? Simply select it and make your changes using <code>'Update Note'</code>. And if you ever need to <code>remove a note</code>, just hit <code>'Delete'</code> - it's that easy!
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      <strong>Convenient & Seamless Experience</strong>
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      To keep you informed, iNotebook also includes <strong>alert message popups</strong>, ensuring that you get to know the changes made by you.

      Experience the <code>convenience</code> of digital note-taking with <strong>iNotebook</strong> - sign up today and start organizing your thoughts in the cloud!
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default About;