{% extends "./_base_layout.swig" %}

{%block  main %}
	<h1>{{title}}</h1>
 {{contents | safe}}

 {%endblock %}
