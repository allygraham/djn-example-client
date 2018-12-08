---
title: Contact Us
layout: default
order: 7
h2: Contact Us
p: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed cursus nunc quis vehicula tempor.
image-600x600: ../assets/img/contact-600x600.jpg
image-1200x500: ../assets/img/contact-1200x500.jpg
image-2000x650: ../assets/img/contact-2000x650.jpg
---

<h1>Contact Us</h1>
<p>Lorem ipsum dolor sit amet, te tale nullam graecis his, ne mea nihil libris tractatos. At iisque intellegam his, amet alii mediocritatem et has, an has fabulas efficiendi. Rebum discere ius ne, et malorum nusquam quaestio sed. Ex eros euripidis est.</p>

                    
<form class="contact-form" name="Contact_Form" method="post" action="#" enctype="multipart/form-data">

	<label for="Name"> Name *
		<input type="text" name="Name" class="name validate focus" id="Name" data-validate="letters">
		<span class="message" data-default="<i class='fa fa-exclamation-circle' aria-hidden='true'></i>" data-issue="<i class='fa fa-exclamation-circle' aria-hidden='true'></i>" data-success="<i class='fa fa-check' aria-hidden='true'></i>"></span>
	</label>

	<label for="Telephone">Phone Number *
		<input type="tel" name="Telephone" class="phone validate focus" id="Telephone" data-validate="phone">
		<span class="message" data-default="<i class='fa fa-exclamation-circle' aria-hidden='true'></i>" data-issue="<i class='fa fa-exclamation-circle' aria-hidden='true'></i>" data-success="<i class='fa fa-check' aria-hidden='true'></i>"></span>
	</label>

	<label for="Email">E-mail
		<input type="email" name="Email" class="email focus" id="Email" data-validate="email">
		<span class="message" data-default="<i class='fa fa-exclamation-circle' aria-hidden='true'></i>" data-issue="<i class='fa fa-exclamation-circle' aria-hidden='true'></i>" data-success="<i class='fa fa-check' aria-hidden='true'></i>"></span>
	</label>

	<label for="Postcode">Postcode
		<input type="text" name="Postcode" class="postcode focus" id="Postcode">
	</label>

	<label class="further-details">Do you have any special requirements? :
		<textarea name="Enquiry" class="email" rows="6" data-validate="text"></textarea>
		<span class="message" data-default="<i class='fa fa-exclamation-circle' aria-hidden='true'></i>" data-issue="<i class='fa fa-exclamation-circle' aria-hidden='true'></i>" data-success="<i class='fa fa-check' aria-hidden='true'></i>"></span>
	</label>

  <input name="submit_contact_form" class="submit" type="submit" value="Contact Us" disabled="disabled">

  <!-- Loading spinner. Add class of "white" to .loading element to make it white -->
  <p class="loading wrapper">Sending <span class="loader"></span></p>
</form>