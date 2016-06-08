{% extends "./_base_layout.swig" %}

{%block  main %}

	<h1>{{ site_name }}</h1>
	<ul>
	{% for post in collections.posts %}
		<li>
			<h4>
				<a href="/{{post.path}}">{{post.title | safe }}</a>
			</h4>
			<p class="text-muted">{{post.date | date('jS \o\f F, Y') }}</p>
			<div class="lead">{{post.excerpt | safe}}</div>
		</li>
	{% endfor %}
	</ul>

 {%endblock %}
