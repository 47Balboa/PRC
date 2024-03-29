<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="text"/>
    
    <xsl:template match="obra">
        ###  http://www.semanticweb.org/shahzodyusupov/ontologies/2020/1/arquivo-musica-digital#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ;
        :compositor "<xsl:value-of select="compositor"/>"^^xsd:string ;
        :tipo "<xsl:value-of select="tipo"/>"^^xsd:string ;
        :titulo "<xsl:value-of select="titulo"/>"^^xsd:string ;    
        <xsl:for-each select="instrumentos/instrumento">
            :utiliza :<xsl:value-of select="translate(designacao, ' ','')"/>_<xsl:value-of select="../../@id"/> ;
        </xsl:for-each> .
        <xsl:apply-templates select="instrumentos" />
    </xsl:template>
    
    
    
    <xsl:template match="instrumento" >
        ###  http://www.semanticweb.org/shahzodyusupov/ontologies/2020/1/arquivo-musica-digital#<xsl:value-of select="translate(designacao, ' ','')"/>
        :<xsl:value-of select="translate(designacao, ' ','')"/>_<xsl:value-of select="translate(../../@id, ' ','')"/> rdf:type owl:NamedIndividual ;
        :designacao "<xsl:value-of select="designacao"/>"^^xsd:string .
        <xsl:apply-templates select="inf-relacionada" />
        <xsl:apply-templates select="partitura" />
    </xsl:template>
    
    <xsl:template match="partitura" >
        ### http://www.semanticweb.org/shahzodyusupov/ontologies/2020/1/arquivo-musica-digital#<xsl:value-of select="@path"/>
        :<xsl:value-of select="@path"/> rdf:type owl:NamedIndividual ;
        :define :<xsl:value-of select="translate(../designacao, ' ','')"/>_<xsl:value-of select="translate(../../../@id, ' ','')"/> ;
           :path "<xsl:value-of select="@path"/>"^^xsd:string ;
           :type "<xsl:value-of select="@type"/>"^^xsd:string ;
           :afinacao "<xsl:value-of select="@afinacao"/>"^^xsd:string ;
           :arranjo "<xsl:value-of select="@arranjo"/>"^^xsd:string ;
           :clave "<xsl:value-of select="@clave"/>"^^xsd:string ;
           :voz "<xsl:value-of select="@voz"/>"^^xsd:string .
            
    </xsl:template>
    
    <xsl:template match="inf-relacionada" >
        http://www.semanticweb.org/shahzodyusupov/ontologies/2020/1/arquivo-musica-digital#<xsl:value-of select="video"/>
        :<xsl:value-of select="video"/> rdf:type owl:NamedIndividual ;
        :video "<xsl:value-of select="video"/>"^^xsd:string .   
    </xsl:template>
    
    
</xsl:stylesheet>