import csv

with open('alunos.csv') as tabela:
    alunos = csv.reader(tabela, delimiter=',')
    output = open("alunos.ttl","w")
    linha = 0
    for row in alunos:
        if linha > 0:
            output.write(f'### http://prc.di.uminho.pt/2020/SalaAula#{row[0]}\n')
            output.write(f':{row[0]} rdf:type owl:NamedIndividual ,\n')
            output.write(f'\t\t\t\t :Aluno ;\n')
            output.write(f'\t\t:frequenta :gcs ,\n')
            output.write(f'\t\t\t\t   :pri ;\n')
            output.write(f'\t\t:curso "MIEI"^^xsd:string ;\n')
            output.write(f'\t\t:email"{row[0].lower()}@alunos.uminho.pt"^^xsd:string ;\n')
            output.write(f'\t\t:ident "{row[0]}"^^xsd:string ;\n')
            output.write(f'\t\t:nome "{row[1]}"^^xsd:string .\n')
            output.write(f'\n\n')
        linha += 1
    output.close()
